import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useGetPostsQuery } from "../../../../redux/usersApi";

export const Body = ({ messages, status, socket }: { messages: any; status: any; socket: any }) => {
  const navigate = useNavigate();

  const handleLeave = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const { data = [], isLoading } = useGetPostsQuery("");

  return (
    <>
      <header className={styles.header}>
        <button className={styles.btn} onClick={handleLeave}>
          Покинуть чат
        </button>
      </header>

      <div className={styles.container}>
        {data.map((el: any) =>
          el.name === sessionStorage.getItem("user") ? (
            <div key={el.author_id} className={styles.chats}>
              <p className={styles.senderName}>Вы</p>
              <div className={styles.messageSender}>
                <p>{el.text}</p>
              </div>
            </div>
          ) : (
            <div key={el.author_id} className={styles.chats}>
              <p>{el.name}</p>
              <div className={styles.messageRecipient}>
                <p>{el.text}</p>
              </div>
            </div>
          )
        )}

        <div className={styles.status}>
          <p>{status}</p>
        </div>
      </div>
    </>
  );
};
