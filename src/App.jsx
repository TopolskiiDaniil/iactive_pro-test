import { useDispatch, useSelector } from "react-redux";
import AppLayout from "./layouts/appLayout/AppLayout";
import MainPage from "./pages/mainPage/MainPage";
import { useEffect } from "react";
import {
  checkNewMessages,
  fetchInitialMessages,
  setItemsFromStorage,
} from "./features/data/messagesSlice";
import { UPDATE_MESSAGES_INTERVAL } from "./const/common";

function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.messages);

  useEffect(() => {
    const saved = localStorage.getItem("messages");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch(setItemsFromStorage(parsed));
        } else {
          dispatch(fetchInitialMessages());
        }
      } catch {
        dispatch(fetchInitialMessages());
      }
    } else {
      dispatch(fetchInitialMessages());
    }

    const interval = setInterval(() => {
      dispatch(checkNewMessages());
    }, UPDATE_MESSAGES_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <AppLayout>
      <MainPage />
    </AppLayout>
  );
}

export default App;
