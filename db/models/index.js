module.exports = {
  // add each model to your exports object here
  // so that you can use them in your express server api routers
  // for example, create a users.js file for a User model
  // and User: require('./user') here
};

// then, in your API, you'll require the appropriate model
// and use its database connectors
// ie User.getUserById(), where user.js had a module.exports
// that looked like this: module.exports = { getUserById, ... }
const { Client } = require('pg') // imports the pg module

const client = new Client('postgres://localhost:5432/juicebox-dev');

/**
 * USER Methods
 */

async function createUser({ 
  username, 
  password,
  name,
  location
}) {
  try {
    const { rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password, name, location) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password, name, location]);

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

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, username, name, location, active 
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT id, username, name, location, active
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

/**
 * POST Methods
 */

async function createProduct({
  authorId,
  title,
  content,
  tags = []
}) {
  try {
    const { rows: [ products ] } = await client.query(`
      INSERT INTO products("authorId", title, content) 
      VALUES($1, $2, $3)
      RETURNING *;
    `, [authorId, title, content]);

    const tagList = await createTags(tags);

    return await addTagsToProduct(product.id, tagList);
  } catch (error) {
    throw error;
  }
}

async function updateProducts(productId, fields = {}) {
  // read off the tags & remove that field 
  const { tags } = fields; // might be undefined
  delete fields.tags;

  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  try {
    // update any fields that need to be updated
    if (setString.length > 0) {
      await client.query(`
        UPDATE products
        SET ${ setString }
        WHERE id=${ productId }
        RETURNING *;
      `, Object.values(fields));
    }

    // return early if there's no tags to update
    if (tags === undefined) {
      return await getProductById(productId);
    }

    // make any new tags that need to be made
    const tagList = await createTags(tags);
    const tagListIdString = tagList.map(
      tag => `${ tag.id }`
    ).join(', ');

    // delete any post_tags from the database which aren't in that tagList
    await client.query(`
      DELETE FROM product_tags
      WHERE "tagId"
      NOT IN (${ tagListIdString })
      AND "productId"=$1;
    `, [productId]);

    // and create post_tags as necessary
    await addTagsToProduct(productId, tagList);

    return await getProductById(productId);
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows: productIds } = await client.query(`
      SELECT id
      FROM products;
    `);

    const products = await Promise.all(productIds.map(
      product => getProductById( product.id )
    ));

    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductById(productId) {
  try {
    const { rows: [ product ]  } = await client.query(`
      SELECT *
      FROM products
      WHERE id=$1;
    `, [productId]);

    const { rows: tags } = await client.query(`
      SELECT tags.*
      FROM tags
      JOIN product_tags ON tags.id=product_tags."tagId"
      WHERE product_tags."productId"=$1;
    `, [productId])

    const { rows: [author] } = await client.query(`
      SELECT id, username, name, location
      FROM users
      WHERE id=$1;
    `, [product.authorId])

    product.tags = tags;
    product.author = author;

    delete product.authorId;

    return product;
  } catch (error) {
    throw error;
  }
}

async function getProductsByUser(userId) {
  try {
    const { rows: productIds } = await client.query(`
      SELECT id 
      FROM products 
      WHERE "authorId"=${ userId };
    `);

    const products = await Promise.all(productIds.map(
      product => getProductById( product.id )
    ));

    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductsByTagName(tagName) {
  try {
    const { rows: productIds } = await client.query(`
      SELECT products.id
      FROM products
      JOIN product_tags ON products.id=product_tags."productId"
      JOIN tags ON tags.id=product_tags."tagId"
      WHERE tags.name=$1;
    `, [tagName]);

    return await Promise.all(productIds.map(
      product => getProductById(product.id)
    ));
  } catch (error) {
    throw error;
  }
} 

/**
 * TAG Methods
 */

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const valuesStringInsert = tagList.map(
    (_, index) => `$${index + 1}`
  ).join('), (');

  const valuesStringSelect = tagList.map(
    (_, index) => `$${index + 1}`
  ).join(', ');

  try {
    // insert all, ignoring duplicates
    await client.query(`
      INSERT INTO tags(name)
      VALUES (${ valuesStringInsert })
      ON CONFLICT (name) DO NOTHING;
    `, tagList);

    // grab all and return
    const { rows } = await client.query(`
      SELECT * FROM tags
      WHERE name
      IN (${ valuesStringSelect });
    `, tagList);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createProductTag(productId, tagId) {
  try {
    await client.query(`
      INSERT INTO product_tags("productId", "tagId")
      VALUES ($1, $2)
      ON CONFLICT ("productId", "tagId") DO NOTHING;
    `, [productId, tagId]);
  } catch (error) {
    throw error;
  }
}

async function addTagsToProduct(productId, tagList) {
  try {
    const createProductTagPromises = tagList.map(
      tag => createProductTag(productId, tag.id)
    );

    await Promise.all(createProductTagPromises);

    return await getProductById(productId);
  } catch (error) {
    throw error;
  }
}

async function getAllTags() {
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM tags;
    `);

    return { rows }
  } catch (error) {
    throw error;
  }
}


module.exports = {  
  client,
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  createProduct,
  updateProduct,
  getAllProducts,
  getProductsByUser,
  getProductsByTagName,
  createTags,
  getAllTags,
  createProductTag,
  addTagsToProduct,
  getUserByUsername
}