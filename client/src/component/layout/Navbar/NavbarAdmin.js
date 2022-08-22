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
import beeSad from "../../../assets/beeSad.png";
export const NavbarAdmin = () => {
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
          top: 85,
          backgroundColor: "yellow",
          borderRadius: "0px 20px 20px 0px",
          height: "40rem",
        }}
        id="sidebarMenu"
        className="collapse d-lg-block sidebar collapse"
      >
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
              <a className="list-group-item list-group-item-action py-2 ripple ">
                <i className="fas fa-chart-area fa-fw me-3"></i>
                <span>CRUD FOODS</span>
              </a>
            </NavLink>
            <NavLink
              style={{
                borderRadius: "10px",
                margin: "10px 0px 10px 0px",
                textDecoration: "none",
              }}
              activeClassName="active1"
              to="/registerStaff"
              exact
            >
              <a className="list-group-item list-group-item-action py-2 ripple ">
                <i className="fas fa-chart-area fa-fw me-3"></i>
                <span>CRUD ACCOUNT</span>
              </a>
            </NavLink>
            <NavLink
              style={{
                borderRadius: "10px",
                margin: "10px 0px 10px 0px",
                textDecoration: "none",
              }}
              activeClassName="active1"
              to="/viewUser"
              exact
            >
              <a className="list-group-item list-group-item-action py-2 ripple ">
                <i className="fas fa-chart-area fa-fw me-3"></i>
                <span>USER</span>
              </a>
            </NavLink>
            <NavLink
              style={{
                borderRadius: "10px",
                margin: "10px 0px 10px 0px",
                textDecoration: "none",
              }}
              activeClassName="active1"
              to="/viewUser"
              exact
            >
              <a className="list-group-item list-group-item-action py-2 ripple ">
                <i className="fas fa-chart-area fa-fw me-3"></i>
                <span>Webiste traffic</span>
              </a>
            </NavLink>
          </div>
        </div>
        <div style={{ margin: "16rem 0px 0px 5rem", cursor: "pointer" }}>
          <GrLogout
            size={30}
            variant="secondary"
            className="font-weight-bolder text-white"
            onClick={logout}
          ></GrLogout>
        </div>
      </div>

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
        <a className="navbar-brand" href="#">
          Epic Foods
        </a>
        <form className="d-none d-md-flex input-group w-auto my-auto">
          <input
            autocomplete="off"
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
      </nav>
    </Wrapper>
  );
};
export default NavbarAdmin;
