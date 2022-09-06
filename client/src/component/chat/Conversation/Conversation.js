import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import Wrapper from "./ConversationStyle";
const Conversation = ({ conversation, currentUser }) => {
  console.log("id conversation", conversation);
  console.log("day la currenuser", currentUser);
  const {
    authState: {
      user: { _id },
    },
  } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      const res = await axios(
        "http://localhost:5000/api/auth/get_user/?userId=" + friendId
      );
      console.log("day la friend", friendId);

      setUser(res.data);
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <Wrapper>
      <div className="conversation">
        <img className="conversationImg" src={user?.avatar} />
        <span className="conversationName">{user?.username}</span>
      </div>
    </Wrapper>
  );
};

export default Conversation;
