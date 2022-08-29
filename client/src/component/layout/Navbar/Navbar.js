import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../../assets/logox2.png";
import logoutIcon from "../../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import beeSad from "../../../assets/avatar.png";
import { GrLogout } from "react-icons/gr";
import { CartContext } from "../../../contexts/CartContext";
import { MdOutlineShoppingCart } from "react-icons/md";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username, avatar },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <nav
      id="main-navbar"
      className="navbar navbar-expand-lg navbar-light  fixed-top"
      style={{ height: "80px", backgroundColor: "#FFFF33	" }}
    >
      <div>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <img src={Logo} alt="Logo" width="50px" height="50px" className="mr-3" />
      <form className="d-none d-md-flex input-group w-auto my-auto">
        <input
          autoComplete="off"
          type="search"
          className="form-control rounded"
          placeholder="Search..."
          style={{ marginLeft: "30rem", width: "225px" }}
        />
      </form>
      <Link to="/editProfile">
        <div style={{ marginLeft: "30em", marginRight: "10px" }}>
          <h4>
            {" "}
            <img
              style={{ borderRadius: "50px" }}
              src={!avatar ? beeSad : avatar}
              width="42"
              height="42"
              className="mr-2"
            />{" "}
          </h4>
        </div>
        <div style={{ marginRight: "20px" }}>{username}</div>
      </Link>
      <Link to="/cart_User">
        <MdOutlineShoppingCart
          size={30}
          variant="secondary"
        ></MdOutlineShoppingCart>
      </Link>
      <div style={{ margin: "0px 0px 0px 1rem", cursor: "pointer" }}>
        <GrLogout
          size={30}
          variant="secondary"
          className="font-weight-bolder text-white"
          onClick={logout}
        ></GrLogout>
      </div>
    </nav>
  );
};

export default NavbarMenu;
