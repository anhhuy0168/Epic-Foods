import React from "react";
import Wrapper from "./MessageStyle";
import { format } from "timeago.js";
const Message = ({ message, own }) => {
  return (
    <Wrapper>
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="messageImg"
            src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/236420914_897669454463433_725789746545339877_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=zoJmU55hxlcAX_0SO8E&_nc_ht=scontent.fhan2-3.fna&oh=00_AT9czG697js3RZ8GljJ-y_wNSOMsyn3l4na3jkMkWDwXgw&oe=631C01B9"
            alt=""
          />
          <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
      </div>
    </Wrapper>
  );
};

export default Message;
