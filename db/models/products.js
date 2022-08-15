const client = require("../client");


module.exports = {
  createProduct,
  getAllProducts,
  getProductById
};

async function createProduct({ title, description, price }) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
        INSERT INTO products (title, description, price) 
        VALUES($1, $2, $3)
        RETURNING *;
      `,
      [title, description, price]
    );

    return products;
  } catch (error) {
    throw error;
  }
}

// async function updateProducts(productId, fields = {}) {
//   // const { tags } = fields; // might be undefined
//   // delete fields.tags;

//   // build the set string
//   const setString = Object.keys(fields)
//     .map((key, index) => `"${key}"=$${index + 1}`)
//     .join(", ");

//   try {
//     // update any fields that need to be updated
//     if (setString.length > 0) {
//       await client.query(
//         `
//           UPDATE products
//           SET ${setString}
//           WHERE id=${productId}
//           RETURNING *;
//         `,
//         Object.values(fields)
//       );
//     }

//     return await getProductById(productId);
//   } catch (error) {
//     throw error;
//   }
// }

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
        SELECT *
        FROM products;
      `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  try {
    const { rows: [ product ] } = await client.query(`
      SELECT * 
      FROM products
      WHERE id=$1;
      `, [id]);
        return product;
        
  } catch (error) {
    throw error;
  }
}

// async function getProductsByUser(userId) {
//   try {
//     const { rows: productIds } = await client.query(`
//       SELECT id
//       FROM products
//       WHERE "authorId"=${ userId };
//     `);

//     const products = await Promise.all(productIds.map(
//       product => getProductById( product.id )
//     ));

//     return products;
//   } catch (error) {
//     throw error;
//   }
// }
