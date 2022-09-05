import React from "react";
import Wrapper from "./ConversationStyle";
const Conversation = () => {
  return (
    <Wrapper>
      <div className="conversation">
        <img className="conversationImg" />
        <span className="conversationName">John</span>
      </div>
    </Wrapper>
  );
};

export default Conversation;
