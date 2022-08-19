import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = ({authenticated, setAuthenticated, setCurrentUser}) => {
  const [dropDown, setDropDown] = useState("none");

  const handleClick = (event) => {
    event.preventDefault();
    if (dropDown === event.target.id) {
      setDropDown("none");
    } else {
      setDropDown(event.target.id);
    }
  };

  const handleLogOut = (event) => {
    event.preventDefault();
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    setCurrentUser(null);
    setAuthenticated(false);
  }
  
  const renderDropDown = () => {
    switch (dropDown) {
      default:
        return null;
      case "null":
        return null;
      case "profile":
        return (
          <div id="profile-dropdown">
            {authenticated?
              <Fragment>
                <Link to="/profile">View Profile</Link>
                <Link to="/login" onClick={handleLogOut}>Logout</Link>
              </Fragment>:
              <Link to="/login">Login</Link>
            }
          </div>
        );
      case "cart":
        return (
          <div id="cart-dropdown">
            <Link to="/cart">View Cart</Link>
          </div>
        );
    }
  };

  return (
    <Fragment>
      <div id="navbar">
        <Link to="/" id="logo">
          camelCases
        </Link>
        <input id="searchbar" placeholder="Search..."></input>
        <button id="search-button">Search</button>
        <button className="navbar-button" id="cart" onClick={handleClick}>
          Cart
        </button>
        <button className="navbar-button" id="profile" onClick={handleClick}>
          Profile
        </button>
      </div>
      {renderDropDown()}
    </Fragment>
  );
};

export default Navbar;