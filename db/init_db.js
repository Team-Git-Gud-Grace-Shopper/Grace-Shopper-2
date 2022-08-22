const {
  client,
  User,
  Products,

  // declare your model imports here
  // for example, User
} = require("./");

client.connect();

async function buildTables() {
  try {
    // drop tables in correct order

    console.log("Dropping all tables....");
    await client.query(`
      DROP TABLE IF EXISTS cart_items;
      DROP TABLE IF EXISTS cart_orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables");

    // build tables in correct order

    console.log("Creating tables...");

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

    CREATE TABLE cart_items (
      "productId" INTEGER REFERENCES products(id),
      "cartId" INTEGER REFERENCES cart_orders(id)

    );
    
    `);
    console.log("Finished creating tables");
    console.log();
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  console.log("Starting to create users...");
  try {
    
    const user1 = await User.createUser({
      username: "nftshopper",
      password: "itssecret123",
      email: "shopper@email.com",
    });
    const user2 = await User.createUser({
      username: "goodinvestmentguy",
      password: "thisissuchascam",
      email: "invest@email.com",
    });
    const user3 = await User.createUser({
      username: "whatarenfts",
      password: "wowicantbelieveit",
      email: "scamman@email.com",
    });
    console.log("finished creating users");
    console.log("these are our users:", user1, user2, user3);

    console.log("starting to create products");
    const product1 = await Products.createProduct({
      title: "Original Camel NFT",
      description: "The infamous original, no introduction needed.",
      price: "999.99",
    });
    const product2 = await Products.createProduct({
      title: "A Picture of a Camel",
      description: "It's just camel and it's a picture.",
      price: "110.99",
    });
    const product3 = await Products.createProduct({
      title: "camelCase NFT",
      description: "It's a digital picture of a camel phone case.",
      price: "39.99",
    });
    const product4 = await Products.createProduct({
      title: "Camel Phone Case",
      description: "An original camelCase camel phone case.",
      price: "399.99",
    });
    const product5 = await Products.createProduct({
      title: "SCAMelCase NFT",
      description:
        "A one of a kind, unique digital thing that for sure has meaning.",
      price: "199.99",
    });
    const product6 = await Products.createProduct({
      title: "camelCase Hump Day Special",
      description:
        "A two for one deal, a camelCase original NFT AND the pride of owning it, all in one!",
      price: "19.99",
    });
    const product7 = await Products.createProduct({
      title: "Waterbottle NFT",
      description:
        "Doesn't hold a lot of water but you get the idea that if it was real, it probably could hold water.",
      price: "259.99",
    });
    const product8 = await Products.createProduct({
      title: "Layered Sand Jar NFT",
      description: "A homage to our humble namesake's natural habitat.",
      price: "489.99",
    });
    const product9 = await Products.createProduct({
      title: "A Singluar Straw",
      description: "WARNING: Will break a back if not placed properly!",
      price: "105.99",
    });
    const product10 = await Products.createProduct({
      title: "Desert Dessert NFT",
      description:
        "A crunchy, sweet and salty delight packed with meaning and value.",
      price: "225.99",
    });
    console.log("Finished creating products");
    console.log(
      "these are products:",
      product1,
      product2,
      product3,
      product4,
      product5,
      product6,
      product7,
      product8,
      product9,
      product10
    );
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
