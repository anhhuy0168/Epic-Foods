import React from "react";
import Wrapper from "./FooterStyled";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
const Footer = () => {
  return (
    <>
      <Wrapper>
        <footer className="footer" style={{ margin: "10rem 0 0 0" }}>
          <div className="container">
            <div className="row">
              <div className="footer-col">
                <h4>company</h4>
                <ul>
                  <li>
                    <a href="#">about us</a>
                  </li>
                  <li>
                    <a href="#">our services</a>
                  </li>
                  <li>
                    <a href="#">privacy policy</a>
                  </li>
                  <li>
                    <a href="#">affiliate program</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>get help</h4>
                <ul>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">shipping</a>
                  </li>
                  <li>
                    <a href="#">returns</a>
                  </li>
                  <li>
                    <a href="#">order status</a>
                  </li>
                  <li>
                    <a href="#">payment options</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>online shop</h4>
                <ul>
                  <li>
                    <a href="#">Foods</a>
                  </li>
                  <li>
                    <a href="#">Drink</a>
                  </li>
                  <li>
                    <a href="#">Vegetable</a>
                  </li>
                  <li>
                    <a href="#">Chicken</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>follow us</h4>
                <div className="social-links">
                  <a href="#">
                    <BsFacebook size={37} style={{ marginTop: "-5px" }} />
                  </a>
                  <a href="#">
                    <BsTwitter size={32} style={{ marginTop: "-5px" }} />
                  </a>
                  <a href="#">
                    <AiOutlineInstagram
                      size={32}
                      style={{ marginTop: "-5px" }}
                    />
                  </a>
                  <a href="#">
                    <AiFillLinkedin size={32} style={{ marginTop: "-5px" }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Wrapper>
    </>
  );
};

export default Footer;
