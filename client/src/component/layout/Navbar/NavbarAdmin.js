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
import { BiCategoryAlt } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { FaBusinessTime } from "react-icons/fa";
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
          top: 0,
          backgroundColor: "yellow",
          borderRadius: "0px 0px 00px 0px",
          height: "50rem",
        }}
        id="sidebarMenu"
        className="collapse d-lg-block sidebar collapse"
      >
        <div style={{ marginLeft: "5rem" }}>
          <h4>
            <img
              style={{ borderRadius: "50px", marginLeft: "7px" }}
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
                  marginTop: "90px",
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
              to="/Category"
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
                <BiCategoryAlt
                  style={{ marginRight: "20px", color: "black" }}
                  size={30}
                ></BiCategoryAlt>
                <div
                  style={{ marginTop: "5px", fontSize: "17px", color: "black" }}
                >
                  Category
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
              to="/registerStaff"
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
                <FaUserTie
                  style={{ marginRight: "20px", color: "black" }}
                  size={30}
                ></FaUserTie>
                <div
                  style={{ marginTop: "5px", fontSize: "17px", color: "black" }}
                >
                  Staff Account
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
              to="/viewUser"
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
                <HiUsers
                  style={{ marginRight: "20px", color: "black" }}
                  size={30}
                ></HiUsers>
                <div
                  style={{ marginTop: "5px", fontSize: "17px", color: "black" }}
                >
                  User Account
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
              to="/viewUser"
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
                <FaBusinessTime
                  style={{ marginRight: "20px", color: "black" }}
                  size={30}
                ></FaBusinessTime>
                <div
                  style={{ marginTop: "5px", fontSize: "17px", color: "black" }}
                >
                  Business
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        <div style={{ margin: "5rem 0px 0px 6rem", cursor: "pointer" }}>
          <GrLogout
            size={30}
            variant="secondary"
            className="font-weight-bolder text-white"
            onClick={logout}
          ></GrLogout>
        </div>
      </div>
    </Wrapper>
  );
};
export default NavbarAdmin;
