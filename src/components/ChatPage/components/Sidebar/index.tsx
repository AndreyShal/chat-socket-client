import { useState, useEffect } from "react";
import styles from "./index.module.css";

export const Sidebar = ({ socket }: { socket: any }) => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    socket.on("responseNewUser", (data: any) => setUsers([...users, data]));
  }, [socket, users]);

  // const filteredList = users.filter(
  //   (value: any, index: any, self: any) => index === self.findIndex((t: any) => t.user == value.user && t.socketID == value.socketID)
  // );

  return (
    <div className={styles.sidebar}>
      <h4 className={styles.header}>Users</h4>
      <ul className={styles.users}>
        {/* {users.map((el: any) => (
          <li key={el.socketID}>{el.user}</li>
        ))} */}
      </ul>
    </div>
  );
};
