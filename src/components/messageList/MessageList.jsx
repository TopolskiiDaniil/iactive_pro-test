import styles from "./messageList.module.css";
import Message from "../message/Message";

export default function MessageList({ items }) {
  return (
    <ul className={styles.container}>
      {items.map((item) => (
        <Message key={item.id} item={item} />
      ))}
    </ul>
  );
}
