import { useEffect } from "react";

const Waiter=()=> {

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws/waiter/");

    socket.onopen = () => {
      console.log("✅ Waiter connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("🍽️ Waiter Notification:", data.message);
    };

    return () => socket.close();

  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>🍽️ Waiter Screen</h1>
      <p>Waiting for prepared food...</p>
    </div>
  );
}
export default Waiter;