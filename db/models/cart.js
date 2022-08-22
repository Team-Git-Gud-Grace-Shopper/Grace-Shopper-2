const client = require('../client');

module.exports = {
    createCartItem,
    getCart
};

async function createCartItem(productId, userId){
    try {
        await client.query(`
            INSERT INTO cart_items("userId", "productId")
            VALUES ($1, $2)
            ON CONFLICT ("userId", "productId") DO NOTHING;
        `, [productId, userId]);
    } catch (error) {
        throw error;
    }
}

async function getCart(userId){
    try {
        const {rows: users} = await client.query(`
            SELECT users.id
            FROM users
            JOIN cart_items ON users.id = cart_items."userId"
            JOIN products ON products.id = cart_items."productId"
            WHERE users.id = $1;
        `, [userId]);
        return users;
    } catch (error) {
        throw error;
    }
}