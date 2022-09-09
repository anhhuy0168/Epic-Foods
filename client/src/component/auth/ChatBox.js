import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../contexts/AuthContext";
import { RiMessengerLine } from "react-icons/ri";
import { io } from "socket.io-client";
import Message from "../chat/Conversation/message";
import Conversation from "../chat/Conversation/Conversation";
import axios from "axios";
import Wrapper from "../layout/messenger/MessStyle";
import { ChatContext } from "../../contexts/ChatContext";
import NavbarMenu from "../layout/Navbar/Navbar";
import { AdminContext } from "../../contexts/AdminContext";
import Logo from "../../assets/logox2.png";
import Form from "react-bootstrap/Form";
import { AiOutlineSend } from "react-icons/ai";
import { BsFillNutFill } from "react-icons/bs";
import { useHistory } from "react-router";
const ChatBox = () => {
  const [ShowForm, setShowForm] = useState(false);
  const showForms = () => {
    setShowForm(!ShowForm);
  };
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  const history = useHistory();
  const [hidden, setHidden] = useState(false);
  const {
    authState: {
      user,
      user: { _id },
    },
  } = useContext(AuthContext);
  const {
    conversationState: { conversation },
    createConversation,
  } = useContext(ChatContext);
  const {
    userState: { users },
    getStaff,
  } = useContext(AdminContext);
  //ramdom staff
  useEffect(() => getStaff(), []);
  const random = Math.floor(Math.random() * users.length);
  const staffId = users[random]?._id;
  //
  const createStaffConversation = () => {
    createConversation({ staffId, _id });
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);
  //get conversation
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/conversations/${user._id}`
        );
        setCurrentChat(res.data[0]);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id, conversation]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages(messages);
  }, [currentChat]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [messages]);

  // console.log("conversation", conversations);
  // console.log("currentChat", currentChat);
  // console.log("conversation context", conversation);

  return (
    <>
      <NavbarMenu />
      <Wrapper>
        <div className="messenger">
          <div
            className="chatBox"
            style={{
              marginLeft: "25rem",
              height: "40rem",
              boxShadow:
                "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
              marginTop: "6rem",
              borderRadius: "20px 20px 0 0",
            }}
          >
            <div
              className="chatBoxWrapper"
              style={{ padding: "0 0px 10px 0px" }}
            >
              {currentChat ? (
                <>
                  <div
                    style={{
                      backgroundColor: "yellow",
                      height: "70px",
                      borderRadius: "20px 20px 0 0",
                    }}
                  >
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "0 0 40px 0",
                      }}
                      src={Logo}
                    />
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "20px",
                        position: "relative",
                        top: -115,
                        left: 100,
                      }}
                    >
                      Epic Foods Support
                    </div>
                  </div>

                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === user._id} />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <Form
                      style={{ display: "flex", height: "3rem" }}
                      onSubmit={handleSubmit}
                    >
                      <Form.Group
                        style={{ height: "1rem" }}
                        controlId="formBasicEmail"
                      >
                        <Form.Control
                          required
                          type="text"
                          placeholder="Aa"
                          onChange={(e) => setNewMessage(e.target.value)}
                          value={newMessage}
                          style={{
                            width: "30rem",
                            marginTop: "10px",
                            marginLeft: "90px",
                            borderRadius: "30px",
                            backgroundColor: "#CCCCCC",
                          }}
                        />
                      </Form.Group>
                      <AiOutlineSend size={40} style={{ marginTop: "10px" }} />
                    </Form>
                  </div>
                </>
              ) : (
                <span
                  style={{ textAlign: "center", padding: "10rem 30px 0 30px" }}
                >
                  <img
                    style={{
                      width: "400px",
                      height: "400px",
                      margin: "-120px",
                    }}
                    src={Logo}
                  />
                  <div>
                    Remember: Epic Foods employees will never ask for your
                    personal information and staff will reply to messages in a
                    few minutes
                  </div>
                  Press button below to start a chat!
                  <div>
                    <div>
                      {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                          {!hidden && (
                            <>
                              <Button
                                style={{ marginTop: "40px" }}
                                st
                                variant="success"
                                onClick={() => setHidden(true)}
                              >
                                Start to chat
                              </Button>
                            </>
                          )}
                        </div>
                      ))}
                      {!conversations[0] ? (
                        <>
                          <div onClick={() => createStaffConversation()}>
                            <Button
                              style={{ marginTop: "40px" }}
                              st
                              variant="success"
                              onClick={() => setHidden(true)}
                            >
                              Start to chat
                              {conversations.map((c) => (
                                <>
                                  <Button
                                    style={{ marginTop: "40px" }}
                                    st
                                    variant="success"
                                    onClick={() => setHidden(true)}
                                  >
                                    <div
                                      onClick={() => setCurrentChat(c)}
                                    ></div>
                                    Start to chat
                                  </Button>
                                </>
                              ))}
                            </Button>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </span>
              )}
            </div>
          </div>

          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              {/* <ChatOnline
                onlineUsers={onlineUsers}
                currentId={user._id}
                setCurrentChat={setCurrentChat}
              /> */}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ChatBox;
