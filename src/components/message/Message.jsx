import styles from "./message.module.css";
import someAvatarSrc from "./../../assets/icons/user-avatar.svg";
import imageSrc from "./../../assets/media-image@2x 2.jpg";
import HideIcon from "../icons/HideIcon";
import OptionsIcon from "../icons/OptionsIcon";
import FavoriteIcon from "../icons/FavoriteIcon";
import { formatTime } from "../../utils/formatTime";
import { truncateText } from "../../utils/truncateText";
import { MAX_LENGTH_CONTENT } from "../../cons/common";
import { useState } from "react";

export default function Message({ item }) {
  const { author, channel, date, content } = item;
  const [isShowMore, setShowMore] = useState(false);

  const handleShowMoreButton = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <li className={styles.container}>
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
            <button className={styles["column-btn"]}>Левый</button>
            <button className={styles["column-btn"]}>Центр</button>
            <button className={styles["column-btn"]}>Правый</button>
          </div>
          <div className={styles.actions}>
            <button className={styles["action-btn"]} aria-label="Выбрать">
              <label>
                <input type="checkbox" name="choose" value="choose" />
              </label>
            </button>
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
          <p className={styles.message}>
            {isShowMore || content.length <= MAX_LENGTH_CONTENT
              ? content
              : truncateText(content, MAX_LENGTH_CONTENT)}
          </p>

          {content.length > MAX_LENGTH_CONTENT && (
            <button className={styles.next} onClick={handleShowMoreButton}>
              {isShowMore ? "Скрыть" : "Далее"}
            </button>
          )}

          <img className={styles.attachment} src={imageSrc} alt="" />
        </main>
      </div>
    </li>
  );
}
