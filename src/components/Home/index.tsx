import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./index.module.css";

export const Home = ({ socket }: { socket: any }) => {
  const navigate = useNavigate();
  const [name, setUser] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sessionStorage.setItem("user", name);
    socket.emit("newUser", { name, socketID: socket.id });
    navigate("./chat");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2>Вход в чат</h2>
      <label htmlFor="user"></label>
      <input type="text" id="user" value={name} onChange={(e) => setUser(e.target.value)} className={styles.userInput} />
      <button type="submit" className={styles.homeBtn}>
        Войти
      </button>
    </form>
  );
};
