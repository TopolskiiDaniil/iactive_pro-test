import styles from "./mainPage.module.css";
import MessageList from "../../components/messageList/MessageList";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <MessageList />
    </div>
  );
}
