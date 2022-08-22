import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { checkCurrentUser, checkSession, getAPIHealth, getProducts } from '../axios-services';
import '../style/App.css';
import { 
  Cart,
  ProductListings,
  Navbar,
  Login,
  SingleProductView
} from '.';


const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [productList, setProductList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [cartList, setCartList] = useState([]);
  // const [singleProduct, setSingleProduct] = useState([]);
  console.log(cartList)
  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  useEffect(() => {
    getProducts()
    .then((result) => setProductList(result.data));
  }, [])

  useEffect(() => {
    if (sessionStorage.username){
      checkCurrentUser(sessionStorage.username)
      .then((result) => {setCurrentUser(result.data)})
    }
  }, [])

  useEffect(() => {
    if (currentUser){
      setAuthenticated(true);
    }
    else {
      setAuthenticated(false);
    }
  })

  useEffect(() => {
    if(sessionStorage.cart){
      setCartList(JSON.parse(sessionStorage.cart))
    }
  }, [])

  return (

    

    <BrowserRouter>
    <Navbar
      authenticated={authenticated}
      setAuthenticated={setAuthenticated}
      setCurrentUser={setCurrentUser}
      />
      <Switch>
        <Route exact path='/'>
          
          <div className="app-container">
            {authenticated?
              <h1>Welcome to camelCases, {currentUser.username}!</h1>:
              <h1>Welcome to camelCases!</h1>
            }
            <p>API Status: {APIHealth}</p>
          </div>
          <ProductListings
            productList= {productList}
            cartList={cartList}
            setCartList={setCartList}/>
        </Route>
        <Route path="/cart"><Cart
            authenticated={authenticated}
            currentUser={currentUser}
            cartList={cartList}/></Route>
        <Route path='/login'>
          
          <Login
            setAuthenticated={setAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            />
        </Route>
        <Route path='/products/:id'><SingleProductView productList={productList}/></Route>
      </Switch>
    </BrowserRouter>

  );
};

export default App;


