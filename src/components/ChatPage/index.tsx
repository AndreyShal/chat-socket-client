import { useState, useEffect } from "react";
import { Body } from "./components/Body";
import { MessageBlock } from "./components/MessageBlock";
import { Sidebar } from "./components/Sidebar";
import styles from "./index.module.css";
import { useGetPostsQuery } from "../../redux/usersApi";
import { useAddPostMutation } from "../../redux/usersApi";

export const ChatPage = ({ socket }: { socket: any }) => {
  const [messages, setMessages] = useState<any>([]);
  const [status, setStatus] = useState("");

  const [addPost, { isError }] = useAddPostMutation();

  useEffect(() => {
    // socket.on("response", (data: any) => setMessages([...messages, data]));
    socket.on("response", (data: any) => {
      // const array = JSON.parse(data);
      // console.log(data);
      // setMessages([]);
      // setMessages([...array]);
      // console.log(data);
      addPost(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("responseTyping", (data: any) => {
      setStatus(data);
      setTimeout(() => setStatus(""), 1000);
    });
  });

  return (
    <div className={styles.chat}>
      <Sidebar socket={socket} />
      <main className={styles.main}>
        <Body messages={messages} status={status} socket={socket} />
        <MessageBlock socket={socket} />
      </main>
    </div>
  );
};
