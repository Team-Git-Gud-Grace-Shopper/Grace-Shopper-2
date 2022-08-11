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
const { client } = require('pg') // imports the pg module

// async function getProductsByTagName(tagName) {
//   try {
//     const { rows: productIds } = await client.query(`
//       SELECT products.id
//       FROM products
//       JOIN product_tags ON products.id=product_tags."productId"
//       JOIN tags ON tags.id=product_tags."tagId"
//       WHERE tags.name=$1;
//     `, [tagName]);

//     return await Promise.all(productIds.map(
//       product => getProductById(product.id)
//     ));
//   } catch (error) {
//     throw error;
//   }
// } 

// /**
//  * TAG Methods
//  */

// async function createTags(tagList) {
//   if (tagList.length === 0) {
//     return;
//   }

//   const valuesStringInsert = tagList.map(
//     (_, index) => `$${index + 1}`
//   ).join('), (');

//   const valuesStringSelect = tagList.map(
//     (_, index) => `$${index + 1}`
//   ).join(', ');

//   try {
//     // insert all, ignoring duplicates
//     await client.query(`
//       INSERT INTO tags(name)
//       VALUES (${ valuesStringInsert })
//       ON CONFLICT (name) DO NOTHING;
//     `, tagList);

//     // grab all and return
//     const { rows } = await client.query(`
//       SELECT * FROM tags
//       WHERE name
//       IN (${ valuesStringSelect });
//     `, tagList);

//     return rows;
//   } catch (error) {
//     throw error;
//   }
// }

// async function createProductTag(productId, tagId) {
//   try {
//     await client.query(`
//       INSERT INTO product_tags("productId", "tagId")
//       VALUES ($1, $2)
//       ON CONFLICT ("productId", "tagId") DO NOTHING;
//     `, [productId, tagId]);
//   } catch (error) {
//     throw error;
//   }
// }

// async function addTagsToProduct(productId, tagList) {
//   try {
//     const createProductTagPromises = tagList.map(
//       tag => createProductTag(productId, tag.id)
//     );

//     await Promise.all(createProductTagPromises);

//     return await getProductById(productId);
//   } catch (error) {
//     throw error;
//   }
// }

// async function getAllTags() {
//   try {
//     const { rows } = await client.query(`
//       SELECT * 
//       FROM tags;
//     `);

//     return { rows }
//   } catch (error) {
//     throw error;
//   }
// }


// module.exports = {  
//   client,
//   createUser,
//   updateUser,
//   getAllUsers,
//   getUserById,
//   createProduct,
//   updateProduct,
//   getAllProducts,
//   getProductsByUser,
//   // getProductsByTagName,
//   // createTags,
//   // getAllTags,
//   // createProductTag,
//   // addTagsToProduct,
//   getUserByUsername
// }