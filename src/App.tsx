import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { ChatPage } from "./components/ChatPage";
const socket = io("http://localhost:8080/");

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home socket={socket} />} />
      <Route path="/chat" element={<ChatPage socket={socket} />} />
    </Routes>
  );
}

export default App;
