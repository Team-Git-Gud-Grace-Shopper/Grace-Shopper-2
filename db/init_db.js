const { client, User, Products } = require("./");

client.connect();

async function buildTables() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS cart_items;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);
    console.log("Finished dropping tables");

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      admin BOOLEAN DEFAULT false
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
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
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

    const admin = await User.createAdmin({
      username: "bigboss",
      password: "bigboss",
      email: "bigboss@theman.com",
      admin: true,
    });

    const product1 = await Products.createProduct({
      title: "Original Camel",
      description:
        "The infamous original, no introduction needed. Created years before the current craze, this exclusive piece pre-dates all others by decades. It's value shines bright and intense like the desert sun",
      price: "999.99",
      image:
        "https://lh3.googleusercontent.com/e4MQoxUe7UVFrxKDMi-qDv9P5h6Aben_2qzOQoObNGpn5M0bK3S9blvWuFzb7yo5Cegm5p3f6HnNvKePsfbuvOREE50AAR-OTCcjmQ=w600",
    });
    const product2 = await Products.createProduct({
      title: "A Picture of a Camel",
      description:
        "It's just camel and it's a picture. You can't get more simple than that. Just good, clean LEGAL fun. Hand-drawn by a world renown artist, 8 year old Tommy who is probably your friend's brother or nephew or something.",
      price: "110.99",
      image:
        "https://artprojectsforkids.org/wp-content/uploads/2020/03/Draw-a-Camel.jpg",
    });
    const product3 = await Products.createProduct({
      title: "Phone case camelCase",
      description:
        "It's a digital picture of a camel phone case. If it actually existed it would be a good investment to protect your cellular phone from drops and spills.",
      price: "39.99",
      image:
        "https://res.cloudinary.com/teepublic/image/private/s--UsBLTEVK--/c_crop,x_10,y_10/c_fit,w_449/c_crop,g_north_west,h_1100,w_554,x_-53,y_-388/l_upload:v1452885561:production:blanks:gawvl5gka1pqwssxidw5/fl_layer_apply,g_north_west,x_-414,y_-465/b_rgb:668cde/c_limit,f_jpg,h_630,q_90,w_630/v1507525999/production/designs/1958128_1.jpg",
    });
    const product4 = await Products.createProduct({
      title: "camelCase Phone Case",
      description:
        "An original camelCase camel phone case. It's actually a real phone case! This one is just a prototype and not available for sale as of yet but you can pre-oder it here! Pre-orders are great and have proven to be worth it time and time again.",
      price: "399.99",
      image:
        "https://render.fineartamerica.com/images/rendered/default/phone-case/iphone13/images/artworkimages/medium/2/beautiful-shaggy-camel-chewing-on-hay-in-aruba-dejavu-designs.jpg?&targetx=0&targety=-58&imagewidth=1581&imageheight=1052&modelwidth=1581&modelheight=902&backgroundcolor=53321E&orientation=1",
    });
    const product5 = await Products.createProduct({
      title: "SCAMelCase",
      description:
        "A one of a kind, unique digital thing that for sure has meaning. Be careful: buy at your own risk! This one can be high risk, high reward.",
      price: "199.99",
      image:
        "https://thumbs.dreamstime.com/z/sign-dangerous-scammers-beach-camel-riding-children-fraud-144261503.jpg",
    });
    const product6 = await Products.createProduct({
      title: "camelCase Hump Day Special",
      description:
        "A two for one deal, a camelCase original piece AND the pride of owning it, all in one! The middle of the week is the ultimate glass half full or empty example. Are you a pessimist or an optimist? This exclusive deal will help you find out!",
      price: "19.99",
      image:
        "https://www.rd.com/wp-content/uploads/2021/09/guess-what-day-it-is.jpg",
    });
    const product7 = await Products.createProduct({
      title: "Waterbottle",
      description:
        "It doesn't actually hold water but you get the idea that if it was real, it probably could hold water. It has a really chic aesthetic that will definitely increase your cool level by a factor of exactly 1. No drinking of actual water required!",
      price: "259.99",
      image: "https://nftcalendar.io/wp-content/uploads/2021/09/0008.jpg",
    });
    const product8 = await Products.createProduct({
      title: "Layered Sand Jar",
      description:
        "A homage to our humble namesake's natural habitat. Do you remember playing with those sand color kits when you were a kid? This is a perfect gift to remind someone of how old they are while also paying tribute to the beautiful landscape that inspired it!",
      price: "489.99",
      image: "https://kinderart.com/wp-content/uploads/sandjar.jpg",
    });
    const product9 = await Products.createProduct({
      title: "A Singluar Straw",
      description:
        "WARNING: Will break a back if not placed properly! Avoid placing on someone's back while also avoiding the cracks in the ground for the sake of your mother.",
      price: "105.99",
      image: "http://blog.novanatural.com/wp-content/uploads/2014/11/straw.jpg",
    });
    const product10 = await Products.createProduct({
      title: "Desert Dessert",
      description:
        "A crunchy, sweet and salty delight packed with meaning and value. They are made from scratch with love and care by those hands you see in the picture. Recipe sold seperately! ",
      price: "225.99",
      image:
        "https://hooraymag.com/wp-content/uploads/2017/05/Cactus-Cup-Cakes_Desert-Desserts_02.jpg",
    });
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
