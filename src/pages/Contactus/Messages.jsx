import React, { useEffect, useRef, useState } from "react";
import "./Contactus.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Messages = ({ socket, user_id, admin, user }) => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const bottomRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  useEffect(() => {
    if (allMessages.length === 0) {
      if (admin) {
        axios
          .get(`http://localhost:5000/users/message/${user.id}/${user_id}`)
          .then((result) => {
            // console.log();
            setAllMessages(result.data.allMessages);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get(`http://localhost:5000/users/message/${user_id}`)
          .then((result) => {
            // console.log();
            setAllMessages(result.data.allMessages);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, [allMessages]);

  const sendMessage = () => {
    socket.emit("message", {
      to: admin ? user.id : 7,
      from: Number(user_id),
      message,
    });
  };

  const receiveMessage = (data) => {
    console.log(data);
    setAllMessages([...allMessages, data]);
  };

  return (
    <div
      className="page-content page-container"
      id="page-content"
      style={{ display: "flex", justifyContent: "center", width: "50vw" }}
    >
      <div className="padding" style={{ width: "100%" }}>
        <div>
          <div className="col-md-6">
            <div className="card card-bordered">
              <div className="card-header">
                <h4 className="card-title">
                  {admin ? (
                    <strong style={{ alignContent: "center" }}>
                      {user.firstname} {user.lastname}
                    </strong>
                  ) : (
                    <strong>Customer service</strong>
                  )}
                </h4>
              </div>

              <div
                className="ps-container ps-theme-default ps-active-y"
                id="chat-content"
                style={{ width: "100%" }}
              >
                <div className="media media-meta-day">Today</div>
                {allMessages.length > 0 &&
                  allMessages.map((message, i) => {
                    return (
                      <div key={i}>
                        <div
                          className="media-body"
                          style={
                            Number(user_id) == message.from
                              ? {
                                  display: "flex",
                                  justifyContent: "start",
                                }
                              : {
                                  display: "flex",
                                  justifyContent: "end",
                                }
                          }
                        >
                          <p
                            style={
                              Number(user_id) == message.from
                                ? {
                                    backgroundColor: "#3f51b5",
                                    padding: "10px",
                                    borderRadius: "15%",
                                    color: "white",
                                  }
                                : {
                                    backgroundColor: "#818181",
                                    padding: "10px",
                                    borderRadius: "15%",
                                    color: "white",
                                  }
                            }
                          >
                            {message.message} {""}
                            {message.createdAt ? (
                              <time style={{ fontSize: "10px" }}>
                                {new Date(message.createdAt).getHours()}:
                                {new Date(message.createdAt).getMinutes()}
                              </time>
                            ) : (
                              <time style={{ fontSize: "10px" }}>
                                {new Date().getHours()}:
                                {new Date().getMinutes()}
                              </time>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                <div className="media media-chat media-chat-reverse"></div>

                <div
                  className="ps-scrollbar-x-rail"
                  style={{ left: "0px", bottom: "0px" }}
                >
                  <div
                    className="ps-scrollbar-x"
                    tabIndex="0"
                    style={{ left: "0px", bottom: "0px" }}
                  ></div>
                </div>
                <div
                  className="ps-scrollbar-y-rail"
                  style={{ top: "0px", height: "0px", right: "2px" }}
                >
                  <div
                    className="ps-scrollbar-y"
                    tabIndex="0"
                    style={{ top: "0px", height: "2px" }}
                  ></div>
                </div>
                <div ref={bottomRef} />
              </div>
              <div className="publisher bt-1 border-light">
                <img
                  className="avatar avatar-xs"
                  src="https://img.icons8.com/color/36/000000/administrator-male.png"
                  alt="..."
                />
                <input
                  className="publisher-input"
                  type="text"
                  placeholder="Write something"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    sendMessage();
                    axios
                      .post(`http://localhost:5000/users/message/${user_id}`, {
                        to: "7",
                        message,
                      })
                      .then((result) => {
                        console.log(result);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
