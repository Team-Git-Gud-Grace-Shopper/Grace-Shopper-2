import axios from "axios";

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
    const response = await axios.get("/api/");
    return response;
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
      userId: userId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function removeItemFromCart(productId, userId) {
  try {
    const response = await axios.post("/api/cart/remove", {
      productId: productId,
      userId: userId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function emptyCart() {
  try {
    const response = await axios.post("/api/cart/empty");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getCart(userId) {
  try {
    const response = await axios.post("/api/cart/", {
      userId: userId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSingleProduct(id) {
  try {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {}
}

export async function getAllUsers() {
  try {
    const response = await axios.get("/api/users");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function checkCurrentUser(username) {
  try {
    const response = await axios.post("/api/users", {
      username: username,
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
