import styled from "styled-components";
const Wrapper = styled.main`
  .message {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }

  .messageTop {
    display: flex;
  }

  .messageImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  .messageText {
    padding: 10px;
    border-radius: 20px;
    background-color: #bbbbbb;
    color: black;
    max-width: 300px;
  }

  .messageBottom {
    font-size: 12px;
    margin-top: 10px;
  }

  .message.own {
    align-items: flex-end;
    img {
      display: none;
    }
  }

  .message.own .messageText {
    background-color: #0099cc;
    color: black;
  }
`;
export default Wrapper;
