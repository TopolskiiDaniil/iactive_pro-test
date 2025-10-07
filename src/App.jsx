import { useDispatch, useSelector } from "react-redux";
import AppLayout from "./layouts/appLayout/AppLayout";
import MainPage from "./pages/mainPage/MainPage";
import { useEffect } from "react";
import { fetchMessages } from "./features/data/messagesSlice";

function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchMessages());
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
