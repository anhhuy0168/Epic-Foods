import styled from "styled-components";
const Wrapper = styled.main`
  .messenger {
    height: calc(100vh - 70px);
    display: flex;
  }

  .chatMenu {
    flex: 3.5;
  }

  .chatMenuInput {
    width: 90%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid gray;
  }

  .chatBox {
    flex: 5.5;
  }

  .chatBoxWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  .chatBoxTop {
    height: 100%;
    overflow-y: scroll;
    padding-right: 10px;
  }

  .chatBoxBottom {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .chatMessageInput {
    width: 80%;
    height: 90px;
    padding: 10px;
  }

  .chatSubmitButton {
    width: 70px;
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: teal;
    color: white;
  }

  .chatOnline {
    flex: 3;
  }

  .chatMenuWrapper,
  .chatBoxWrapper,
  .chatOnlineWrapper {
    padding: 10px;
    height: 100%;
  }

  .noConversationText {
    position: absolute;
    top: 10%;
    font-size: 50px;
    color: rgb(224, 220, 220);
    cursor: default;
  }

  @media screen and (max-width: 768px) {
    .chatMenu {
      flex: 1;
    }

    .chatMenuInput {
      display: none;
    }

    .chatBox {
      flex: 10;
    }

    .chatOnline {
      flex: 1px;
    }
  }
`;
export default Wrapper;
