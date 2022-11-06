import styled from "styled-components";
const Wrapper = styled.section`
  position: relative;
  top: -25rem;
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
