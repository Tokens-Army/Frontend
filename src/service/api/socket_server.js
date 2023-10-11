import io from "socket.io-client";

const socketInit = ({ user_id, token }) => {
  return io("https://wash-my-ride-chat-server.onrender.com/", {
    extraHeaders: {
      user_id,
      token,
    },
    // autoConnect: true, // .connect()  .open()
  });
};

export default socketInit;
