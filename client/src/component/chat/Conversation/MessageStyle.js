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
    background-color: #1877f2;
    color: white;
    max-width: 300px;
  }

  .messageBottom {
    font-size: 12px;
    margin-top: 10px;
  }

  .message.own {
    align-items: flex-end;
  }

  .message.own .messageText {
    background-color: rgb(245, 241, 241);
    color: black;
  }
`;
export default Wrapper;
