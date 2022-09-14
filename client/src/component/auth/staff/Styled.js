import styled from "styled-components";
const Wrapper = styled.main`
  .singleProduct {
    height: 8rem;
    transition: transform 0.4s;
  }
  .singleProduct:hover {
    transform: scale(1.1);
    border-radius: "20px";
  }
`;
export default Wrapper;
