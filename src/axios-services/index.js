import axios from "axios";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

//PATCH cart request updating quantity product === id
//update to number being passed

//DELETE id that === cart ID


export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function checkSession() {
  try {
    const response = await axios.get('/api/');
    return response
  } catch (error) {
    throw error;
  }
}

export async function getProducts() {
  try {
    const response = await axios.get("/api/products");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addItemToCart(productId, userId) {
  try {
    const response = await axios.post("/api/cart/add", {
      productId: productId,
      userId: userId
    });
    console.log("This is add item response", response);
    return response.data;
  } catch (error) {
    throw error
  }
}

export async function removeItemFromCart(productId, userId){
  console.log("what's passed into axios: " + productId + " " + userId)
  try {
    const response = await axios.post("/api/cart/remove", {
      productId: productId,
      userId: userId
    });
    return response;
  } catch (error){
    throw error;
  }
}

export async function getCart(userId) {
  try {
    const response = await axios.post("/api/cart/", {
      userId: userId
    });
    console.log("This is get cart response", response)
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSingleProduct(id) {
  try {
    const response = await axios.get(`/api/products/${id}`);
    console.log("This is a single product:", response);
    return response.data;
  } catch (error) {}
}

export async function getAllUsers() {
  try {
    const response = await axios.get("/api/users");

    console.log(response);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function checkCurrentUser(username) {
  try {
    const response = await axios.post('/api/users', {
      username: username
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function register(newUser) {
  try {
    const response = await axios.post("/api/users/register", {
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function login(username, password) {
  try {
    const response = await axios.post("api/users/login", {
      username: username,
      password: password,
    });
    return response;
  } catch (error) {
    throw error;
  }
}