import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../../assets/logox2.png";
import logoutIcon from "../../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import beeSad from "../../../assets/beeSad.png";
const NavbarMenu = () => {
  const {
    authState: {
      user: { username, avatar },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <div>
      <Navbar expand="lg" bg="warning" variant="dark" className="shadow">
        <Navbar.Brand className="font-weight-bolder text-white">
          <img
            src={Logo}
            alt="Logo"
            width="50px"
            height="50px"
            className="mr-3"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/homepage"
              as={Link}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/about"
              as={Link}
            >
              About
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link className="font-weight-bolder text-white" disabled>
              <img
                style={{ borderRadius: "50px" }}
                src={!avatar ? beeSad : avatar}
                width="42"
                height="42"
                className="mr-2"
              />{" "}
              Welcome {username}
            </Nav.Link>
            <Button
              variant="secondary"
              className="font-weight-bolder text-white"
              onClick={logout}
            >
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width="32"
                height="32"
                className="mr-2"
              />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarMenu;
