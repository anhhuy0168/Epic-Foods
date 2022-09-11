import styled from "styled-components";
const Wrapper = styled.main`
  background-color: #fbfbfb;

  @media (min-width: 991.98px) {
    main {
      padding-left: 240px;
    }
  }

  /* Sidebar */
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    padding: 58px 0 0; /* Height of navbar */
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
    width: 240px;
    z-index: 600;
  }

  @media (max-width: 991.98px) {
    .sidebar {
      width: 100%;
    }
  }
  .sidebar .active {
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgba(212, 226, 14, 0.884),
      0 2px 10px 0 rgb(222, 222, 8);
  }

  .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }
  .option {
    transition: transform 1s;
  }
  .option:hover {
    font-weight: 500;
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
    border-radius: 15px;
    transform: scale(1.1);
  }
`;
export default Wrapper;
