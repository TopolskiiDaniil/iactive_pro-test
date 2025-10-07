import styles from "./mainPage.module.css";
import MessageList from "../../components/messageList/MessageList";
import { useSelector } from "react-redux";

export default function MainPage() {
  const { items } = useSelector((state) => state.messages);

  return (
    <div className={styles.container}>
      {items ? (
        <>
          <MessageList items={[]} />
          <MessageList items={items} />
          <MessageList items={[]} />
        </>
      ) : (
        "Сообщения отсутствуют"
      )}
    </div>
  );
}
