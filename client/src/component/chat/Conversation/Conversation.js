import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import Wrapper from "./ConversationStyle";
import Avatar from "../../../assets/avatar.png";
const Conversation = ({ conversation, currentUser }) => {
  const {
    authState: {
      user: { _id },
    },
  } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      const res = await axios(
        "http://localhost:5000/api/auth/get_user/?userId=" + friendId
      );

      setUser(res.data);
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <Wrapper>
      <div className="conversation">
        <img
          className="conversationImg"
          src={!user?.avatar ? Avatar : user?.avatar}
        />
        <span className="conversationName">{user?.username}</span>
      </div>
    </Wrapper>
  );
};

export default Conversation;
