import { Chat } from "./components/chat/Chat";
import { Detail } from "./components/detail/Detail";
import { List } from "./components/list/List";
import { Landing } from "./components/login/Landing";
import Notification from "./components/notification/Notification";

import { useUserStore } from "./store/userStore";
import { useListenAuth } from "./hooks/useListenAuth";

const App = () => {
  const { currentUser, isLoading } = useUserStore();

  useListenAuth();

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Landing />
      )}
      <Notification />
    </div>
  );
};

export default App;
