import { useState } from "react";
import { useGetMessagesQuery } from "../../../../redux/messagesApi";
import styles from "./index.module.css";
import { useAddPostMutation } from "../../../../redux/usersApi";

export const MessageBlock = ({ socket }: { socket: any }) => {
  const [message, setMessage] = useState("");
  // const { data = [], isLoading } = useGetMessagesQuery("");
  // console.log(data);
  // const [addPost, { isError }] = useAddPostMutation();

  const isTyping = () => {
    socket.emit("typing", `${sessionStorage.getItem("user")} is typing`);
  };

  const handleSend = (e: any) => {
    e.preventDefault();
    if (message.trim() && sessionStorage.getItem("user")) {
      const postMessage = {
        text: message,
        name: sessionStorage.getItem("user"),
        author_id: `${socket.id}--${Math.random()}`,
        socketID: socket.id,
      };
      // ;
      socket.emit("message", postMessage);
    }
    setMessage("");
  };

  return (
    <div className={styles.messageBlock}>
      <form className={styles.form} onSubmit={handleSend}>
        <input type="text" className={styles.userMessage} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={isTyping} />
        <button type="submit" className={styles.btn}>
          Сказать
        </button>
      </form>
    </div>
  );
};
