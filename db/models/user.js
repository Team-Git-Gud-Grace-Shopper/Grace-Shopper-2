// grab our db client connection to use with our adapters
const client = require('../client');

const { Client } = require('pg') // imports the pg module

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
  getUserByUsername
};

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, username, name, email
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createUser({ 
  username, 
  password,
  name,
  email
}) {
  try {
    const { rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password, name, email) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password, name, email]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [ user ] } = await client.query(`
      UPDATE users
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT id, username, name, email
      FROM users
      WHERE id=${ userId }
    `);

    if (!user) {
      return null
    }

    // user.posts = await getPostsByUser(userId);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1;
    `, [username]);

    return user;
  } catch (error) {
    throw error;
  }
}