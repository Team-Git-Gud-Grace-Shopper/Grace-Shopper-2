const client = require ('../client');

const { Client } = require('pg') // imports the pg module

module.exports = {

}

async function createProduct({
    authorId,
    title,
    content,
    price,
    tags = []
  }) {
    try {
      const { rows: [ products ] } = await client.query(`
        INSERT INTO products("authorId", title, content, price) 
        VALUES($1, $2, $3)
        RETURNING *;
      `, [authorId, title, content, price]);
  
      // const tagList = await createTags(tags);
  
      // return await addTagsToProduct(product.id, tagList);
    } catch (error) {
      throw error;
    }
  }
  
  async function updateProducts(productId, fields = {}) {
    // const { tags } = fields; // might be undefined
    // delete fields.tags;
  
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
      // if (tags === undefined) {
      //   return await getProductById(productId);
      // }
  
      // make any new tags that need to be made
      // const tagList = await createTags(tags);
      // const tagListIdString = tagList.map(
      //   tag => `${ tag.id }`
      // ).join(', ');
  
      // delete any post_tags from the database which aren't in that tagList
      // await client.query(`
      //   DELETE FROM product_tags
      //   WHERE "tagId"
      //   NOT IN (${ tagListIdString })
      //   AND "productId"=$1;
      // `, [productId]);
  
      // // and create post_tags as necessary
      // await addTagsToProduct(productId, tagList);
  
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
  
      // const { rows: tags } = await client.query(`
      //   SELECT tags.*
      //   FROM tags
      //   JOIN product_tags ON tags.id=product_tags."tagId"
      //   WHERE product_tags."productId"=$1;
      // `, [productId])
  
      const { rows: [author] } = await client.query(`
        SELECT id, username, name, email
        FROM users
        WHERE id=$1;
      `, [product.authorId])
  
      // product.tags = tags;
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