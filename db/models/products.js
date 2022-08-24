const client = require("../client");


module.exports = {
  createProduct,
  getAllProducts,
  getProductById
};

async function createProduct({ title, description, price, image }) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
        INSERT INTO products (title, description, price, image) 
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `,
      [title, description, price, image]
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

