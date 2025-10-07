import styles from "./messageList.module.css";
import Message from "../message/Message";

export default function MessageList() {
  return (
    <ul className={styles.container}>
      <Message />
    </ul>
  );
}
