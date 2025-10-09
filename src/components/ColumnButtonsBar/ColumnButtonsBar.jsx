import styles from "./columnButtonsBar.module.css";
import { COLUMN_NAMES } from "../../const/common";

export default function ColumnButtonsBar({ onMove, column, messageId }) {
  const handleMove = (targetColumn) => {
    if (targetColumn === column) return; //исключено, но на всякий случай
    onMove?.(messageId, targetColumn);
  };

  return (
    <div className={styles["column-controls"]}>
      <button
        className={styles["column-btn"]}
        onClick={() => handleMove(COLUMN_NAMES.LEFT)}
        disabled={column === COLUMN_NAMES.LEFT}
      >
        {COLUMN_NAMES.LEFT}
      </button>
      <button
        className={styles["column-btn"]}
        onClick={() => handleMove(COLUMN_NAMES.CENTER)}
        disabled={column === COLUMN_NAMES.CENTER}
      >
        {COLUMN_NAMES.CENTER}
      </button>
      <button
        className={styles["column-btn"]}
        onClick={() => handleMove(COLUMN_NAMES.RIGHT)}
        disabled={column === COLUMN_NAMES.RIGHT}
      >
        {COLUMN_NAMES.RIGHT}
      </button>
    </div>
  );
}
