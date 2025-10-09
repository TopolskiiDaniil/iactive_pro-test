import styles from "./header.module.css";
import { FILTERS, SORT_ORDERS } from "../../const/common";
import { useSelector, useDispatch } from "react-redux";
import {
  changeCurrentFilter,
  changeCurrentSort,
} from "../../features/data/messagesSlice";

export default function Header({ onLoadOlder }) {
  const { currentFilter, currentSort } = useSelector((state) => ({
    currentFilter: state.messages.currentFilter,
    currentSort: state.messages.currentSort,
  }));
  const dispatch = useDispatch();

  const handleSortChange = () => {
    if (currentSort !== SORT_ORDERS.OLDEST) {
      dispatch(changeCurrentSort(SORT_ORDERS.OLDEST));
    } else {
      dispatch(changeCurrentSort(SORT_ORDERS.NEWEST));
    }
  };

  const handleFilterChange = () => {
    if (currentFilter !== FILTERS.ALL) {
      dispatch(changeCurrentFilter(FILTERS.ALL));
    } else {
      dispatch(changeCurrentFilter(FILTERS.FAVORITES));
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.sortGroup}>
        <span className={styles.label}>Сортировка:</span>
        <button
          className={`${styles.sortBtn} ${
            currentSort === SORT_ORDERS.NEWEST ? styles.active : ""
          }`}
          onClick={handleSortChange}
          disabled={currentSort === SORT_ORDERS.NEWEST}
        >
          {SORT_ORDERS.NEWEST}
        </button>
        <button
          className={`${styles.sortBtn} ${
            currentSort === SORT_ORDERS.OLDEST ? styles.active : ""
          }`}
          onClick={handleSortChange}
          disabled={currentSort === SORT_ORDERS.OLDEST}
        >
          {SORT_ORDERS.OLDEST}
        </button>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.label}>Фильтр:</span>
        <button
          className={`${styles.filterBtn} ${
            currentFilter === FILTERS.ALL ? styles.active : ""
          }`}
          onClick={handleFilterChange}
          disabled={currentFilter === FILTERS.ALL}
        >
          Все сообщения
        </button>
        <button
          className={`${styles.filterBtn} ${
            currentFilter === FILTERS.FAVORITES ? styles.active : ""
          }`}
          onClick={handleFilterChange}
          disabled={currentFilter === FILTERS.FAVORITES}
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
