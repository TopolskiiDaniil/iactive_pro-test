import styles from "./mainPage.module.css";
import MessageList from "../../components/messageList/MessageList";
import { shallowEqual, useSelector } from "react-redux";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import { COLUMN_NAMES, FILTERS, SORT_ORDERS } from "../../const/common";
import { useDispatch } from "react-redux";
import {
  updateColumn,
  toggleFavorite,
} from "../../features/data/messagesSlice";

export default function MainPage() {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const {
    items: storeItems = [],
    currentFilter,
    currentSort,
  } = useSelector(
    (state) => ({
      items: state.messages.items,
      currentFilter: state.messages.currentFilter,
      currentSort: state.messages.currentSort,
    }),
    shallowEqual,
  );

  useEffect(() => {
    setItems((prev) => {
      const storeIds = new Set(storeItems.map((m) => m.id));

      let filteredPrev = prev.filter((m) => storeIds.has(m.id));

      const prevIds = new Set(filteredPrev.map((m) => m.id));
      const newMessages = storeItems
        .filter((m) => !prevIds.has(m.id))
        .map((msg) => ({
          ...msg,
          column: msg.column || COLUMN_NAMES.CENTER,
          isShowMore: false,
          isMinimized: false,
        }));

      return [...filteredPrev, ...newMessages];
    });
  }, [storeItems]);

  const sortItems = (arr) => {
    return [...arr].sort((a, b) => {
      if (currentSort === SORT_ORDERS.OLDEST) {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
  };

  const filteredItems = (arr) => {
    if (currentFilter === FILTERS.FAVORITES) {
      return [...arr].filter((item) => item.isFavorite);
    }
    return [...arr];
  };

  const columns = {
    left: filteredItems(
      sortItems(items.filter((i) => i.column === COLUMN_NAMES.LEFT)),
    ),
    center: filteredItems(
      sortItems(items.filter((i) => i.column === COLUMN_NAMES.CENTER)),
    ),
    right: filteredItems(
      sortItems(items.filter((i) => i.column === COLUMN_NAMES.RIGHT)),
    ),
  };

  const moveTo = (id, targetColumn) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, column: targetColumn } : item,
      ),
    );
    dispatch(updateColumn({ id, column: targetColumn }));
  };

  const handleFavoriteButtonClick = (id, isFavorite) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: isFavorite } : item,
      ),
    );
    dispatch(toggleFavorite(id));
  };

  const handleLoadOlder = () => {
    console.log("Загрузить предыдущие сообщения");
    // Вызовите вашу функцию загрузки старых сообщений
  };

  return (
    <>
      <Header onLoadOlder={handleLoadOlder} />
      <div className={styles.container}>
        <MessageList
          items={columns.left}
          column={COLUMN_NAMES.LEFT}
          onMove={moveTo}
          onFavoriteButtonClick={handleFavoriteButtonClick}
        />
        <MessageList
          items={columns.center}
          column={COLUMN_NAMES.CENTER}
          onMove={moveTo}
          onFavoriteButtonClick={handleFavoriteButtonClick}
        />
        <MessageList
          items={columns.right}
          column={COLUMN_NAMES.RIGHT}
          onMove={moveTo}
          onFavoriteButtonClick={handleFavoriteButtonClick}
        />
      </div>
    </>
  );
}
