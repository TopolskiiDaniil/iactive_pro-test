import { useState } from "react";
import styles from "./header.module.css";

export default function Header({
  onSortChange,
  onFilterChange,
  onLoadOlder,
  initialSort = "newest",
  initialFilter = "all",
}) {
  const [sortOrder, setSortOrder] = useState(initialSort);
  const [filter, setFilter] = useState(initialFilter);

  const handleSortChange = (order) => {
    setSortOrder(order);
    onSortChange?.(order);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    onFilterChange?.(filterType);
  };

  return (
    <header className={styles.header}>
      <div className={styles.sortGroup}>
        <span className={styles.label}>Сортировка:</span>
        <button
          className={`${styles.sortBtn} ${
            sortOrder === "newest" ? styles.active : ""
          }`}
          onClick={() => handleSortChange("newest")}
        >
          Новые сверху
        </button>
        <button
          className={`${styles.sortBtn} ${
            sortOrder === "oldest" ? styles.active : ""
          }`}
          onClick={() => handleSortChange("oldest")}
        >
          Старые сверху
        </button>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.label}>Фильтр:</span>
        <button
          className={`${styles.filterBtn} ${
            filter === "all" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("all")}
        >
          Все сообщения
        </button>
        <button
          className={`${styles.filterBtn} ${
            filter === "favorites" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("favorites")}
        >
          Избранные
        </button>
      </div>

      <button className={styles.loadOlderBtn} onClick={onLoadOlder}>
        Загрузить предыдущие
      </button>
    </header>
  );
}
