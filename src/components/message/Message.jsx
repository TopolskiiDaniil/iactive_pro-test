import { useRef, useState } from "react";
import styles from "./message.module.css";
import someAvatarSrc from "./../../assets/icons/user-avatar.svg";
import { formatTime } from "../../utils/formatTime";
import { truncateText } from "../../utils/truncateText";
import { MAX_LENGTH_CONTENT } from "../../const/common";
import ColumnButtonsBar from "../ColumnButtonsBar/ColumnButtonsBar";
import ActionButtonsBar from "../ActionButtonsBar/ActionButtonsBar";
import { deleteMessage } from "../../features/data/messagesSlice";
import { useDispatch } from "react-redux";
import { fadeOut } from "../../utils/fadeOut";

export default function Message({
  item,
  innerRef,
  onMove,
  onFavoriteButtonClick,
}) {
  const { id, author, channel, date, content, column, isFavorite } = item;
  const [isShowMore, setShowMore] = useState(false);
  const [displayContent, setDisplayContent] = useState(
    truncateText(content, MAX_LENGTH_CONTENT),
  );
  const [isMinimized, setIsMinimized] = useState(false);

  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  const dispatch = useDispatch();

  const handleShowMore = () => {
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

      requestAnimationFrame(() => {
        el.style.height = endHeight + "px";
      });

      const onTransitionEnd = () => {
        el.style.height = "auto";
        el.style.transition = "";
        el.removeEventListener("transitionend", onTransitionEnd);
      };

      el.addEventListener("transitionend", onTransitionEnd);
    });
  };

  const handleHideToggleClick = () => {
    const card = contentRef.current;
    if (!card) return;

    const startHeight = card.offsetHeight;

    setIsMinimized((prev) => !prev);

    requestAnimationFrame(() => {
      const endHeight = isMinimized ? card.scrollHeight : 36;

      card.style.height = startHeight + "px";
      card.style.transition = "height 0.3s ease";

      requestAnimationFrame(() => {
        card.style.height = endHeight + "px";
      });

      const onTransitionEnd = () => {
        card.style.height = isMinimized ? "auto" : `${endHeight}px`;
        card.removeEventListener("transitionend", onTransitionEnd);
      };

      card.addEventListener("transitionend", onTransitionEnd);
    });
  };

  const handleDelete = async () => {
    await fadeOut(contentRef.current);
    dispatch(deleteMessage(id));
  };

  return (
    <li className={styles.container} ref={innerRef} data-id={id}>
      <div className={styles["wrapper-container"]} ref={contentRef}>
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
            <ColumnButtonsBar messageId={id} column={column} onMove={onMove} />
            <ActionButtonsBar
              onFavoriteButtonClick={() =>
                onFavoriteButtonClick(id, !isFavorite)
              }
              isFavorite={isFavorite}
              onHideToggleClick={handleHideToggleClick}
              isMinimized={isMinimized}
              onDelete={handleDelete}
            />
          </header>
          {!isMinimized ? (
            <main className={styles.content}>
              <div ref={wrapperRef} className={styles.messageWrapper}>
                <p className={styles.message}>{displayContent}</p>
              </div>

              {content.length > MAX_LENGTH_CONTENT && (
                <button className={styles.next} onClick={handleShowMore}>
                  {isShowMore ? "Скрыть" : "Далее"}
                </button>
              )}
            </main>
          ) : null}
        </div>
      </div>
    </li>
  );
}
