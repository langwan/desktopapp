import { useEffect, useState } from "react";
import io from "socket.io-client";
export default function App() {
  const [currentTime, setCurrentTime] = useState("");
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState("");
  const sio = io("ws://localhost:8000", {
    transports: ["websocket"],
    reconnect: true,
  });
  useEffect(() => {
    console.log("useEffect");

    console.log("sio", sio);
    sio.on("connect", () => {
      console.log("socketio connect", sio.id);
    });

    sio.on("disconnect", () => {
      console.log("socketio disconnect", sio.id);
    });

    sio.on("push", (message) => {
      console.log("push", message);
      if (message.Method == "UpdateTime") {
        setCurrentTime(
          new Date(message.Body.time / 1000000).toLocaleTimeString()
        );
      } else if (message.Method == "UpdateCount") {
        setCount(message.Body.count);
      }
    });

    return () => {};
  }, []);

  const onClick = () => {
    const response = sio.emit("request", { method: "Hello" }, (response) => {
      console.log(response);
      const res = JSON.parse(response.body);
      setResponse(res.message);
    });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <button
        onClick={onClick}
        style={{ fontSize: 50, padding: "20px 50px", margin: "20px" }}
      >
        调用go
      </button>
      <div style={{ fontSize: 50 }}>{response}</div>
      <div style={{ fontSize: 50 }}>{currentTime}</div>
      <div style={{ fontSize: 50 }}>{count}</div>
    </div>
  );
}
