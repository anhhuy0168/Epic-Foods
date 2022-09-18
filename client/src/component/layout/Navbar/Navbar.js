import Logo from "../../../assets/logox2.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useState } from "react";
import beeSad from "../../../assets/avatar.png";
import { GrLogout } from "react-icons/gr";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FoodContext } from "../../../contexts/FoodsContext";
import SingleFoodUser from "../../foods/SingleFoodUser";
import TotalCart from "../../foods/TotalCart";
import SearchProduct from "../../foods/SearchProduct";
const NavbarMenu = () => {
  const {
    foodState: { foods },
    getFoods,
  } = useContext(FoodContext);
  const {
    authState: {
      user: { username, avatar },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();
  const [query, setQuery] = useState("");
  const search = (data) => {
    return data.filter((item) => item.name.toLowerCase().includes(query));
  };
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
      <Link to="/homepage">
        <img
          src={Logo}
          alt="Logo"
          width="50px"
          height="50px"
          className="mr-3"
        />
      </Link>
      <form className="d-none d-md-flex input-group w-auto my-auto">
        <SearchProduct placeholder="Search..." data={foods}></SearchProduct>
      </form>
      <Link to="/editProfile">
        <div
          style={{
            marginLeft: "17rem",
            marginRight: "10px",
            position: "relative",
          }}
        >
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
      </Link>
      <div style={{ marginRight: "20px" }}>{username}</div>
      <Link to="/cart_User" style={{ position: "relative" }}>
        <MdOutlineShoppingCart
          size={30}
          variant="secondary"
        ></MdOutlineShoppingCart>
      </Link>

      <div
        style={{
          margin: "0px 0px 0px 5rem",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <GrLogout
          size={20}
          variant="secondary"
          className="font-weight-bolder text-white"
          onClick={logout}
        ></GrLogout>
      </div>
      <TotalCart />
    </nav>
  );
};

export default NavbarMenu;
