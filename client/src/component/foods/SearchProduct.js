import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Form from "react-bootstrap/Form";
const Test = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <Form.Control
          style={{ width: "20rem", margin: "10px 0 0 30rem" }}
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div
          style={{ position: "relative", top: -30, left: 760 }}
          className="searchIcon"
        >
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            console.log(value);
            return (
              <div key={value._id}>
                <Link to={`/food/detail/${value._id}`}>
                  <div
                    style={{
                      backgroundColor: "white",
                      margin: " -25px 0 0 30rem",
                      padding: "8px 0 20px 10px",
                      borderRadius: "0 0 20px 20px",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      style={{
                        borderRadius: "50px",
                        width: "3rem",
                        height: "3rem",
                        margin: "0 0 -20px 0",
                      }}
                      src={value.productImage}
                    />{" "}
                    <div
                      style={{
                        color: "black",
                        position: "relative",
                        left: 65,
                        top: -15,
                      }}
                    >
                      {" "}
                      {value.name}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Test;
