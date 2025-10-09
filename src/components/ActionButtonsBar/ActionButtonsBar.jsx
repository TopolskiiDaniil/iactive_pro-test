import styles from "./actionButtonsBar.module.css";
import HideIcon from "../icons/HideIcon";
import OptionsIcon from "../icons/OptionsIcon";
import FavoriteIcon from "../icons/FavoriteIcon";
import { useEffect, useRef, useState } from "react";

export default function ActionButtonsBar({
  isFavorite,
  onFavoriteButtonClick,
  isMinimized,
  onHideToggleClick,
  onDelete,
  onCopyText,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.actions}>
      <button
        className={`${styles["action-btn"]} ${isMinimized ? styles.minimized : ""}`}
        aria-label="Скрыть"
        onClick={onHideToggleClick}
      >
        <HideIcon className={styles.icon} />
      </button>

      <div className={styles.optionsWrapper} ref={menuRef}>
        <button
          className={styles["action-btn"]}
          aria-label="Параметры"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <OptionsIcon className={styles.icon} />
        </button>

        {menuOpen && (
          <div className={styles.dropdownMenu}>
            <button
              className={styles.dropdownItem}
              onClick={() => {
                onCopyText?.();
                setMenuOpen(false);
              }}
            >
              Скопировать текст
            </button>
            <button
              className={styles.dropdownItem}
              onClick={() => {
                setConfirmOpen(true);
                setMenuOpen(false);
              }}
            >
              Удалить
            </button>
          </div>
        )}
      </div>

      {confirmOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Вы уверены, что хотите удалить сообщение?</p>
            <div className={styles.modalButtons}>
              <button
                className={styles.modalButton}
                onClick={() => {
                  onDelete();
                  setConfirmOpen(false);
                }}
              >
                Да
              </button>
              <button
                className={styles.modalButton}
                onClick={() => setConfirmOpen(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className={`${styles["action-btn"]} ${isFavorite ? styles.favorite : ""}`}
        aria-label={isFavorite ? "Из избранного" : "В избранное"}
        onClick={onFavoriteButtonClick}
      >
        <FavoriteIcon className={styles.icon} />
      </button>
    </div>
  );
}
