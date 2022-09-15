import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = ({authenticated, setAuthenticated, currentUser, setCurrentUser, cartList, setCartList, productList, setAdmin}) => {
  const [dropDown, setDropDown] = useState("none");

  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.id){
      if (dropDown === event.target.id) {
        setDropDown("none");
      } else {
        setDropDown(event.target.id);
      }
    }
    else {
      if (dropDown === event.target.parentNode.id) {
        setDropDown("none");
      } else {
        setDropDown(event.target.parentNode.id);
      }
    }
  };

  const resetDropDown = () => {
    setDropDown('none');
  }

  const handleLogOut = (event) => {
    event.preventDefault();
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('cart');
    setCurrentUser(null);
    setAuthenticated(false);
    setAdmin(false);
    setCartList([]);
    setDropDown('none');
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
                <i>Welcome {currentUser.username}!</i>
                <Link to="/login" onClick={handleLogOut} id="login-link" >Logout</Link>
              </Fragment>:
              <Link to="/login" onClick={resetDropDown} id="logout-link">Login</Link>
            }
          </div>
        );
      case "cart":
        return (
          <div id="cart-dropdown">
            <Link to="/cart" onClick={resetDropDown}>View Cart</Link>
          </div>
        );
    }
  };

  const handleSearch = event => {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let checkListings = document.getElementsByClassName('listing');
    for (let i = 0; i < productList.length; i++){
        if (!productList[i].title.toLowerCase().includes(input)){
            checkListings[i].style.display = 'none';
        }
        else {
            checkListings[i].style.display = 'block';
        }
    }
}

  return (
    <Fragment>
      <div id="navbar">
        <Link to="/" id="logo" onClick={resetDropDown}>
          camelCases
        </Link>
        <input id="searchbar" placeholder="Search..." onChange={handleSearch}></input>
        <Link to="/cart" className="navbar-button" id="cart">
          <Link to="/cart">({cartList.length})</Link>
          <Link to="/cart" className="material-symbols-outlined">shopping_cart</Link>
        </Link>
        <span className="material-symbols-outlined" onClick={handleClick} id="profile" >
          account_circle
        </span>
      </div>
      {renderDropDown()}
    </Fragment>
  );
};

export default Navbar;