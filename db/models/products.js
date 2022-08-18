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
