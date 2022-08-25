const client = require("../client");


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct
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

async function deleteProduct(id){
  try {
    await client.query(`
      DELETE
      FROM products
      WHERE products.id = $1;
    `, [id])
  } catch (error){
    throw error;
  }
}

async function updateProduct(id, fields = {}) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');
  if (setString.length === 0) {
    return;
  }
  try {
    const { rows: [ product ] } = await client.query(`
      UPDATE products
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return product;
  } catch (error) {
    throw error;
  }
}