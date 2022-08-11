const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');
client.connect();

async function buildTables() {
  try {
    // drop tables in correct order
    
    console.log("Dropping all tables....")
    await client.query(`
      DROP TABLE IF EXISTS individual_cart_items;
      DROP TABLE IF EXISTS cart_orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
    console.log('Finished dropping tables')
    
    // build tables in correct order
    
    console.log("Creating tables...")
    
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL (5,2) 
    );

    CREATE TABLE cart_orders (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "orderStatus" TEXT DEFAULT 'Pending' NOT NULL
    );

    CREATE TABLE individual_cart_items (
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "priceAtPurchase" DECIMAL (5,2),
      "cartId" INTEGER REFERENCES cart_orders(id)
    );
    
    `);
    console.log("Finished creating tables")
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
