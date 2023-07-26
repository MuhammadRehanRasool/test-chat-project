import React, { useState, useEffect, useRef, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Logout from "../Navbar/logoutNavbar";
import "./Dashboard.css";
import { useLocation } from "react-router-dom";
import UserData from "./../../Contexts/UserData";
import { useNavigate } from "react-router-dom";

import io from "socket.io-client";

const Dashboard = () => {
  const navigate = useNavigate();
  const { session, setSession } = useContext(UserData);
  const location = useLocation();
  const username = location?.state?.username;

  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const [my_socket, setMySocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    setMySocket(socket);
    socket.on("hello", (message) => {
      console.log(message); // Print the emitted "hello" event
    });
    socket.on("takeUpdate", (message) => {
      getMessages();
    });

    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch("/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        if (userData.length > 0) {
          let others = userData
            .filter((user, index) => {
              return user?.username !== session.personal?.username;
            })
            .map((a, b) => {
              return { ...a };
            });
          setUsers(others);
          if (others.length > 0) {
            setSelectedUser(others[0]?.username);
          }
        }
      } else {
        const errorData = await response.json();
        console.log(errorData.message); // Log the error message
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session.isLoggedIn) {
      getUsers();
    }
    let sessionData = JSON.parse(sessionStorage.getItem("loggedin"));
    if (!sessionData) {
      navigate("/");
    }
  }, [session]);

  useEffect(() => {
    getMessages();
  }, [selectedUser]);

  const sendMessage = async () => {
    try {
      const response = await fetch("/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: session?.personal?.username,
          to: selectedUser,
          message: text,
          date: "",
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setText("");
        my_socket.emit("newMessage", responseData);
      } else {
        const errorData = await response.json();
        console.log(errorData.message); // Log the error message
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await fetch("/messages", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const messagesData = await response.json();
        setMessages(messagesData);
        console.log(messagesData);
      } else {
        const errorData = await response.json();
        console.log(errorData.message); // Log the error message
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Logout session={session} setSession={setSession} />
      <div className="app">Welcome, {session?.personal?.username}</div>
      <div className="app-container">
        <div className="users-container">
          <div className="chats-text" style={{ textAlign: "center" }}>
            <h2>
              Chats
              <div className="horizontal-rule"></div>
            </h2>
          </div>
          <div className="user-list">
            {users.map((user, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedUser(user?.username);
                  }}
                  key={index}
                  className="userName"
                >
                  {user?.username}
                </div>
              );
            })}
            {/* <div className="horizontal-rule"></div> */}
          </div>
        </div>
        <div className="chatbox-message-container">
          <div className="chatbox">
            {messages
              .filter((a, b) => {
                return (
                  (a?.from === session?.personal?.username ||
                    a?.to === session?.personal?.username) &&
                  (a?.from === selectedUser || a?.to === selectedUser)
                );
              })
              .map((message, index) => {
                const isSentMessage =
                  message.from === session?.personal?.username;
                const messageClassName = isSentMessage
                  ? "message-sent"
                  : "message-received";

                return (
                  <div key={index} className={messageClassName}>
                    {message.message}
                  </div>
                );
              })}
          </div>
          <div className="message-and-send">
            <textarea
              onChange={(e) => {
                setText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="message"
              value={text}
              placeholder='Enter message, then press "Return" or send button...'
            />
            {/* <Button variant="success" className='send-button'>Send</Button> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
