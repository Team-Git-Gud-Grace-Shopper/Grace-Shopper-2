import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => {
  const [dropDown, setDropDown] = useState("none");
  const handleClick = (event) => {
    event.preventDefault();
    if (dropDown === event.target.id) {
      setDropDown("none");
    } else {
      setDropDown(event.target.id);
    }
  };

  // is it working

  const renderDropDown = () => {
    switch (dropDown) {
      default:
        return null;
      case "null":
        return null;
      case "profile":
        return (
          <div id="profile-dropdown">
            {" "}
            <Link to="/profile">View Profile</Link>
            {/* <span onClick={Logout}>Log out</span> */}
            <Link to="/login">Logout</Link>
            <Link to="/login">Login</Link>
            {/* <span onClick={Register}>Register</span> */}
          </div>
        );
      case "cart":
        return (
          <div id="cart-dropdown">
            <Link to="/cart">View Cart</Link>
          </div>
        );
      //   case "menu":
      //     return (
      //       <div id="menu-dropdown">
      //         <span>option 1</span>
      //         <span>option 2</span>
      //         <span>option 3</span>
      //         <span>etc. etc.</span>
      //       </div>
      //     );
      //   case "categories":
      //     return (
      //       <div id="categories-dropdown">
      //         <span>category 1</span>
      //         <span>category 2</span>
      //         <span>category 3</span>
      //         <span>etc. etc.</span>
      //       </div>
      // );
    }
  };

  return (
    <Fragment>
      <div id="navbar">
        <Link to="/" id="logo">
          Camel Cases
        </Link>
        {/* <button id="categories" onClick={handleClick}>
          Categories
        </button> */}
        <input id="searchbar" placeholder="Search..."></input>
        <button id="search-button">Search</button>
        <button className="navbar-button" id="cart" onClick={handleClick}>
          Cart
        </button>
        <button className="navbar-button" id="profile" onClick={handleClick}>
          Profile
        </button>
        {/* <button className="navbar-button" id="menu" onClick={handleClick}>
          Menu
        </button> */}
      </div>
      {renderDropDown()}
    </Fragment>
  );
};

export default Navbar;
//login\register cardinfo logout profile page, no categories