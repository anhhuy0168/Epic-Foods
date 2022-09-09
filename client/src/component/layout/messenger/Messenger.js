import Conversation from "../../chat/Conversation/Conversation";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Wrapper from "./MessStyle";
import { AuthContext } from "../../../contexts/AuthContext";
import NavbarStaff from "../Navbar/NavbarStaff";
import { io } from "socket.io-client";
import Form from "react-bootstrap/Form";
import { AiOutlineSend } from "react-icons/ai";
import Message from "../../chat/Conversation/message";
import { ChatContext } from "../../../contexts/ChatContext";
export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
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
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [user]);
  //get conversation
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/conversations/${user._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id, conversation]);
  console.log(conversation);
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
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <NavbarStaff />
      <Wrapper>
        <div className="messenger" style={{ marginLeft: "17rem" }}>
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input placeholder="Search for user" className="chatMenuInput" />
              {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
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
                            marginLeft: "0px",
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
                <span className="noConversationText">
                  Open a conversation to start a chat.
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
}
