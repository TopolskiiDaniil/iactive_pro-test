import styles from "./mainPage.module.css";
import MessageList from "../../components/messageList/MessageList";
import { shallowEqual, useSelector } from "react-redux";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [sortOrder, setSortOrder] = useState("newest");

  const { items: serverItems = [] } = useSelector(
    (state) => state.messages,
    shallowEqual,
  );
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (serverItems.length === 0) return;

    setItems((prev) => {
      const knownIds = new Set(prev.map((m) => m.id));
      const newOnes = serverItems
        .filter((msg) => !knownIds.has(msg.id))
        .map((msg) => ({ ...msg, column: "center" }));

      return [...prev, ...newOnes];
    });
  }, [serverItems]);

  const moveTo = (id, targetColumn) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, column: targetColumn } : item,
      ),
    );
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortItems = (arr) => {
    return [...arr].sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });
  };

  const columns = {
    left: sortItems(items.filter((i) => i.column === "left")),
    center: sortItems(items.filter((i) => i.column === "center")),
    right: sortItems(items.filter((i) => i.column === "right")),
  };

  const handleFilterChange = (filter) => {
    console.log("Фильтр:", filter);
  };

  const handleLoadOlder = () => {
    console.log("Загрузить предыдущие сообщения");
    // Вызовите вашу функцию загрузки старых сообщений
  };

  return (
    <>
      <Header
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onLoadOlder={handleLoadOlder}
      />
      <div className={styles.container}>
        <MessageList items={columns.left} column="left" onMove={moveTo} />
        <MessageList items={columns.center} column="center" onMove={moveTo} />
        <MessageList items={columns.right} column="right" onMove={moveTo} />
      </div>
    </>
  );
}
