const client = require("../client");

module.exports = {
  getAllUsers,
  createUser,
  createAdmin,
  getUserById,
  getUserByUsername,
  getUser,
};

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createUser({ username, password, email }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, email) 
      VALUES($1, $2, $3 ) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, password, email]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function createAdmin({ username, password, email, admin }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, email, admin) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, password, email, admin]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT id, username, email
      FROM users
      WHERE id=${userId}
    `);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
    `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser(username, password) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username, email
      FROM users
      WHERE username=$1 AND password=$2;
    `,
      [username, password]
    );

    return user;
  } catch (error) {
    throw error;
  }
}
