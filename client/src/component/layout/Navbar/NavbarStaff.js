import Wrapper from "./NavbarAdminStyle";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../../contexts/AuthContext";
import React from "react";
import { FoodContext } from "../../../contexts/FoodsContext";
import SingleFood from "../../../component/foods/SingleFood";
import AddFoodModal from "../../../component/foods/AddFood";
import UpdateFoodModal from "../../../component/foods/UpdateFood";
import addIcon from "../../../assets/plus-circle-fill.svg";
import Spinner from "react-bootstrap/Spinner";
import { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { GrLogout } from "react-icons/gr";
import beeSad from "../../../assets/avatar.png";
import Logo from "../../../assets/logox2.png";
import { MdFastfood } from "react-icons/md";
import { GoListUnordered } from "react-icons/go";
import { BiHistory } from "react-icons/bi";
import TotalOrder from "../../auth/staff/TotalOrder";
import { BsMessenger } from "react-icons/bs";
export const NavbarStaff = ({ total }) => {
  const {
    authState: {
      user: { username, role, avatar },
    },
    logoutUser,
  } = useContext(AuthContext);
  const logout = () => logoutUser();
  return (
    <Wrapper>
      <div
        style={{
          position: "fixed",
          top: 0,
          backgroundColor: "yellow",
          borderRadius: "0px 0px 0px 0px",
          height: "50rem",
        }}
        id="sidebarMenu"
        className="collapse d-lg-block sidebar collapse"
      >
        <div style={{ marginLeft: "5rem" }}>
          <h4>
            <img
              style={{ borderRadius: "50px", marginLeft: "1px" }}
              src={!avatar ? beeSad : avatar}
              width="72"
              height="72"
              className="mr-2"
            />{" "}
          </h4>
          <div style={{ marginLeft: "17px" }}> {role}</div>
        </div>
        <div
          style={{
            height: "0.5px",
            backgroundColor: "black",
            position: "relative",
            top: 60,
          }}
        ></div>
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
            <NavLink
              style={{
                borderRadius: "10px",
                margin: "50px 0px 10px 0px",
                textDecoration: "none",
              }}
              activeClassName="active1"
              to="/homepage"
              exact
            >
              <div
                className="option"
                style={{
                  display: "flex",
                  padding: "10px 0 10px 30px",
                  marginTop: "50px",
                }}
              >
                {" "}
                <MdFastfood
                  style={{ marginRight: "20px", color: "black" }}
                  size={30}
                ></MdFastfood>
                <div
                  style={{ marginTop: "5px", fontSize: "17px", color: "black" }}
                >
                  Foods
                </div>
              </div>
            </NavLink>
            <NavLink
              style={{
                borderRadius: "10px",
                margin: "10px 0px 10px 0px",
                textDecoration: "none",
              }}
              activeClassName="active1"
              to="/viewListOrder"
              exact
            >
              <div
                className="option"
                style={{
                  display: "flex",
                  padding: "10px 0 10px 30px",
                  marginTop: "-15px",
                }}
              >
                {" "}
                <GoListUnordered
                  style={{ marginRight: "20px", color: "black" }}
                  size={30}
                ></GoListUnordered>
                <div
                  style={{ marginTop: "5px", fontSize: "17px", color: "black" }}
                >
                  Orders
                </div>
              </div>
            </NavLink>

            <NavLink
              style={{
                borderRadius: "10px",
                margin: "10px 0px 10px 0px",
                textDecoration: "none",
              }}
              activeClassName="active1"
              to="/viewHistoryOrder"
              exact
            >
              <div
                className="option"
                style={{
                  display: "flex",
                  padding: "10px 0 10px 30px",
                  marginTop: "-15px",
                  position: "relative",
                }}
              >
                {" "}
                <BiHistory
                  style={{ marginRight: "20px", color: "black" }}
                  size={30}
                ></BiHistory>
                <div
                  style={{ marginTop: "5px", fontSize: "17px", color: "black" }}
                >
                  History Orders
                </div>
              </div>
            </NavLink>
            <NavLink
              style={{
                borderRadius: "10px",
                margin: "10px 0px 10px 0px",
                textDecoration: "none",
              }}
              activeClassName="active1"
              to="/messenger"
              exact
            >
              <div
                className="option"
                style={{
                  display: "flex",
                  padding: "10px 0 10px 30px",
                  marginTop: "-15px",
                }}
              >
                {" "}
                <BsMessenger
                  style={{ marginRight: "20px", color: "black" }}
                  size={30}
                ></BsMessenger>
                <div
                  style={{ marginTop: "5px", fontSize: "17px", color: "black" }}
                >
                  Chat
                </div>
              </div>
            </NavLink>
          </div>
          <TotalOrder />
        </div>

        {/* <div
          style={{
            position: "relative",
            top: -110,
            left: 147,
            backgroundColor: "red",
            borderRadius: "20px",
            width: "30px",
            padding: " 2px 2px 2px 10px",
            color: "white",
            fontSize: "16px",
          }}
        >
          {total}
        </div> */}
        <div style={{ margin: "8rem 0px 0px 6rem", cursor: "pointer" }}>
          <GrLogout
            size={30}
            variant="secondary"
            className="font-weight-bolder text-white"
            onClick={logout}
          ></GrLogout>
        </div>
      </div>

      {/* <nav
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
        <img
          src={Logo}
          alt="Logo"
          width="50px"
          height="50px"
          className="mr-3"
        />

        <form className="d-none d-md-flex input-group w-auto my-auto">
          <input
            autoComplete="off"
            type="search"
            className="form-control rounded"
            placeholder="Search..."
            style={{ marginLeft: "30rem", width: "225px" }}
          />
        </form>
        <div style={{ marginLeft: "25rem" }}>
          <h4>
            <img
              style={{ borderRadius: "50px" }}
              src={!avatar ? beeSad : avatar}
              width="42"
              height="42"
              className="mr-2"
            />{" "}
            {role}
          </h4>
        </div>
      </nav> */}
    </Wrapper>
  );
};
export default NavbarStaff;
