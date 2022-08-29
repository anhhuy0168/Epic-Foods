import styled from "styled-components";
const Wrapper = styled.main`
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 10px 16px 0px 16px;
    z-index: 1;
    border-radius: 10px;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
  .Dot:hover {
    background-color: rgb(231, 231, 223);
    padding: 10px;
    border-radius: 10px;
  }
  .content:hover {
    background-color: rgb(177, 177, 168);
  }
  .content {
    border-radius: 5px;
    padding: 3px 3px 3px 10px;
  }
`;
export default Wrapper;
