import { useDispatch, useSelector } from "react-redux";
import AppLayout from "./layouts/appLayout/AppLayout";
import MainPage from "./pages/mainPage/MainPage";
import { useEffect } from "react";
import {
  checkNewMessages,
  fetchInitialMessages,
} from "./features/data/messagesSlice";
import { UPDATE_MESSAGES_INTERVAL } from "./const/common";

function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchInitialMessages());

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
