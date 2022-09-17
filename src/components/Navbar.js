import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = ({authenticated, setAuthenticated, currentUser, setCurrentUser, cartList, setCartList, productList, setAdmin}) => {
  const [dropDown, setDropDown] = useState(false);
  const [searchValue, setSearchValue] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setDropDown(!dropDown);
  };

  const resetDropDown = () => {
    setDropDown(false);
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
    setDropDown(false);
  }
  
  const handleSearch = event => {
    let input = document.getElementById('searchbar').value.toLowerCase();
    if (input){
      setSearchValue(true);
    }
    else {
      setSearchValue(false);
    }
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

const handleX = event => {
  event.preventDefault();
  let input = document.getElementById('searchbar');
  input.value = null;
  let checkListings = document.getElementsByClassName('listing');
  for (let i = 0; i < productList.length; i++){
    checkListings[i].style.display = 'block';
  }
  setSearchValue(false);
}

  return (
    <Fragment>
      <div id="navbar">
        <Link to="/" id="logo" onClick={resetDropDown}>
          camelCases
        </Link>
        <input id="searchbar" placeholder="Search..." onChange={handleSearch}></input>
        {searchValue ?
          <span id="x-button" className="material-symbols-outlined" onClick={handleX}>close</span>:
          null
        }
        <div className="navbar-button" id="cart">
          <Link to="/cart" onClick={resetDropDown}>({cartList.length})</Link>
          <Link to="/cart" className="material-symbols-outlined" onClick={resetDropDown}>shopping_cart</Link>
        </div>
        <div id="profile-tab">
            <span className="material-symbols-outlined" onClick={handleClick} id="profile" >
              account_circle
            </span>
            {currentUser?
              <b id="username-display" onClick={handleClick}>{currentUser.username}</b>:
              null
            }
          {dropDown?
            authenticated?
              <div id="logout-link">
                <Link to="/login" onClick={handleLogOut}>Logout</Link>
              </div>:
              <Link to="/login" onClick={resetDropDown} id="logout-link">Login</Link>:
            null
          }
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;