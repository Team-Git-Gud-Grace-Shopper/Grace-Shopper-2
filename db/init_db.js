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
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
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
      price DECIMAL (5,2),
      image VARCHAR(2048)
    );

    CREATE TABLE cart_items (
      "productId" INTEGER REFERENCES products(id),
      "userId" INTEGER REFERENCES users(id)
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
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
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
      image: "https://lh3.googleusercontent.com/e4MQoxUe7UVFrxKDMi-qDv9P5h6Aben_2qzOQoObNGpn5M0bK3S9blvWuFzb7yo5Cegm5p3f6HnNvKePsfbuvOREE50AAR-OTCcjmQ=w600"
    });
    const product2 = await Products.createProduct({
      title: "A Picture of a Camel",
      description: "It's just camel and it's a picture.",
      price: "110.99",
      image: "https://artprojectsforkids.org/wp-content/uploads/2020/03/Draw-a-Camel.jpg"
    });
    const product3 = await Products.createProduct({
      title: "camelCase NFT",
      description: "It's a digital picture of a camel phone case.",
      price: "39.99",
      image: "https://res.cloudinary.com/teepublic/image/private/s--UsBLTEVK--/c_crop,x_10,y_10/c_fit,w_449/c_crop,g_north_west,h_1100,w_554,x_-53,y_-388/l_upload:v1452885561:production:blanks:gawvl5gka1pqwssxidw5/fl_layer_apply,g_north_west,x_-414,y_-465/b_rgb:668cde/c_limit,f_jpg,h_630,q_90,w_630/v1507525999/production/designs/1958128_1.jpg"
    });
    const product4 = await Products.createProduct({
      title: "Camel Phone Case",
      description: "An original camelCase camel phone case.",
      price: "399.99",
      image: "https://render.fineartamerica.com/images/rendered/default/phone-case/iphone13/images/artworkimages/medium/2/beautiful-shaggy-camel-chewing-on-hay-in-aruba-dejavu-designs.jpg?&targetx=0&targety=-58&imagewidth=1581&imageheight=1052&modelwidth=1581&modelheight=902&backgroundcolor=53321E&orientation=1"
    });
    const product5 = await Products.createProduct({
      title: "SCAMelCase NFT",
      description:
        "A one of a kind, unique digital thing that for sure has meaning.",
      price: "199.99",
      image: "https://thumbs.dreamstime.com/z/sign-dangerous-scammers-beach-camel-riding-children-fraud-144261503.jpg"
    });
    const product6 = await Products.createProduct({
      title: "camelCase Hump Day Special",
      description:
        "A two for one deal, a camelCase original NFT AND the pride of owning it, all in one!",
      price: "19.99",
      image: "https://www.rd.com/wp-content/uploads/2021/09/guess-what-day-it-is.jpg"
    });
    const product7 = await Products.createProduct({
      title: "Waterbottle NFT",
      description:
        "Doesn't hold a lot of water but you get the idea that if it was real, it probably could hold water.",
      price: "259.99",
      image: "https://nftcalendar.io/wp-content/uploads/2021/09/0008.jpg"
    });
    const product8 = await Products.createProduct({
      title: "Layered Sand Jar NFT",
      description: "A homage to our humble namesake's natural habitat.",
      price: "489.99",
      image: "https://kinderart.com/wp-content/uploads/sandjar.jpg"
    });
    const product9 = await Products.createProduct({
      title: "A Singluar Straw",
      description: "WARNING: Will break a back if not placed properly!",
      price: "105.99",
      image: "http://blog.novanatural.com/wp-content/uploads/2014/11/straw.jpg"
    });
    const product10 = await Products.createProduct({
      title: "Desert Dessert NFT",
      description:
        "A crunchy, sweet and salty delight packed with meaning and value.",
      price: "225.99",
      image: "https://hooraymag.com/wp-content/uploads/2017/05/Cactus-Cup-Cakes_Desert-Desserts_02.jpg"
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
