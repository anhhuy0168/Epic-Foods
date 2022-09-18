import styled from "styled-components";
const Wrapper = styled.section`
  position: absolute;
  bottom: 41rem;
  left: 6.5rem;
  top: 47rem;
  .mapboxgl-ctrl-bottom-right {
    display: none;
  }

  .sidebar {
    display: none;
  }

  .marker {
    bottom: 45rem;
    left: 0;
  }
`;
export default Wrapper;
