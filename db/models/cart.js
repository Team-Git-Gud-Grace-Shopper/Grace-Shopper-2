const client = require('../client');

module.exports = {
    createCartItem,
    getCart
};

async function createCartItem(productId, userId){
    try {
        await client.query(`
            INSERT INTO cart_items("productId", "userId")
            VALUES ($1, $2);
        `, [productId, userId]);
    } catch (error) {
        throw error;
    }
}

async function getCart(userId){
    try {
        const {rows} = await client.query(`
            SELECT users.id, products.*
            FROM users
            JOIN cart_items ON users.id = cart_items."userId"
            JOIN products ON products.id = cart_items."productId"
            WHERE users.id = $1;
        `, [userId]);
        console.log("This is rows: " + rows)
        return rows;
    } catch (error) {
        throw error;
    }
}