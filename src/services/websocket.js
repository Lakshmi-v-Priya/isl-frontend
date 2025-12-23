let socket = null;

/**
 * Connect to backend WebSocket
 * @param {function} onMessage - callback to handle incoming data
 */
export const connectWebSocket = (onMessage) => {
  // 👉 CHANGE URL AFTER DEPLOYMENT
  const socket = new WebSocket("wss://isl-backend-x2pl.onrender.com/ws");

  // For production (example):
  // socket = new WebSocket("wss://isl-backend.onrender.com/ws");

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      // Fallback for plain-text messages (errors)
      onMessage({ message: event.data });
    }
  };

  socket.onerror = (error) => {
    console.error("❌ WebSocket error:", error);
  };

  socket.onclose = () => {
    console.warn("⚠️ WebSocket disconnected");
  };
};

/**
 * Send data to backend via WebSocket
 * @param {object|string} data
 */
export const sendMessage = (data) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(typeof data === "string" ? data : JSON.stringify(data));
  }
};
