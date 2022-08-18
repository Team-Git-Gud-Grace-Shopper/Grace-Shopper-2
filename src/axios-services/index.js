import axios from "axios";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
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

export async function getCart() {
  try {
    const response = await axios.get("/api/cart");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSingleProduct() {
  try {
    const response = await axios.get("/api/products/:id");
    console.log("This is a single product:", response);
    return response;
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

export async function getAllUsers() {
  try {
    const response = await axios.get('/api/users');

    console.log(response)

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
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}