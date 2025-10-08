import styles from "./message.module.css";
import someAvatarSrc from "./../../assets/icons/user-avatar.svg";
import HideIcon from "../icons/HideIcon";
import OptionsIcon from "../icons/OptionsIcon";
import FavoriteIcon from "../icons/FavoriteIcon";
import { formatTime } from "../../utils/formatTime";
import { truncateText } from "../../utils/truncateText";
import { MAX_LENGTH_CONTENT } from "../../const/common";
import { useRef, useState } from "react";

export default function Message({ item, onMove, innerRef }) {
  const { id, author, channel, date, content, column } = item;
  const [isShowMore, setShowMore] = useState(false);
  const [displayContent, setDisplayContent] = useState(
    truncateText(content, MAX_LENGTH_CONTENT),
  );

  const wrapperRef = useRef(null);

  const handleToggle = () => {
    const el = wrapperRef.current;
    if (!el) return;

    const startHeight = el.offsetHeight;

    setDisplayContent(
      isShowMore ? truncateText(content, MAX_LENGTH_CONTENT) : content,
    );
    setShowMore((prev) => !prev);

    requestAnimationFrame(() => {
      const endHeight = el.scrollHeight;

      el.style.height = startHeight + "px";
      el.style.transition = "height 0.3s ease";
      el.style.overflow = "hidden";

      requestAnimationFrame(() => {
        el.style.height = endHeight + "px";
      });

      const onTransitionEnd = () => {
        el.style.height = "auto";
        el.style.transition = "";
        el.style.overflow = "";
        el.removeEventListener("transitionend", onTransitionEnd);
      };

      el.addEventListener("transitionend", onTransitionEnd);
    });
  };

  const handleMove = (targetColumn) => {
    if (targetColumn === column) return;
    onMove?.(id, targetColumn);
  };

  return (
    <li className={styles.container} ref={innerRef} data-id={id}>
      <div className={styles.avatar}>
        <img
          className={styles["avatar-icon"]}
          src={someAvatarSrc}
          alt="Аватар"
        />
        <time className={styles.time}>{formatTime(date)}</time>
      </div>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.info}>
            <h3 className={styles.name}>{author}</h3>
            <p className={styles.comment}>{channel}</p>
          </div>
          <div className={styles["column-controls"]}>
            <button
              className={styles["column-btn"]}
              onClick={() => handleMove("left")}
              disabled={column === "left"}
            >
              Левый
            </button>
            <button
              className={styles["column-btn"]}
              onClick={() => handleMove("center")}
              disabled={column === "center"}
            >
              Центр
            </button>
            <button
              className={styles["column-btn"]}
              onClick={() => handleMove("right")}
              disabled={column === "right"}
            >
              Правый
            </button>
          </div>
          <div className={styles.actions}>
            <button className={styles["action-btn"]} aria-label="Скрыть">
              <HideIcon className={styles.icon} />
            </button>
            <button className={styles["action-btn"]} aria-label="Параметры">
              <OptionsIcon className={styles.icon} />
            </button>
            <button className={styles["action-btn"]} aria-label="В избранное">
              <FavoriteIcon className={styles.icon} />
            </button>
          </div>
        </header>
        <main className={styles.content}>
          <div ref={wrapperRef} className={styles.messageWrapper}>
            <p className={styles.message}>{displayContent}</p>
          </div>

          {content.length > MAX_LENGTH_CONTENT && (
            <button className={styles.next} onClick={handleToggle}>
              {isShowMore ? "Скрыть" : "Далее"}
            </button>
          )}
        </main>
      </div>
    </li>
  );
}
