import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, getProducts } from '../axios-services';
import '../style/App.css';
import { 
  ProductListings,
  Navbar,
  Login,
  SingleProductView
} from '.';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [productList, setProductList] = useState([]);
  // const [singleProduct, setSingleProduct] = useState([]);

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

  return (

    

    <BrowserRouter>
    <Navbar/>
      <Switch>
        <Route exact path='/'>
          
          <div className="app-container">
            <h1>Welcome to Camel Cases</h1>
            <p>API Status: {APIHealth}</p>
          </div>
          <ProductListings
            productList= {productList}/>
        </Route>
        <Route path='/login'>
          
          <Login/>
        </Route>
        <Route path='/products/:id'><SingleProductView productList={productList}/></Route>
      </Switch>
    </BrowserRouter>

  );
};

export default App;


