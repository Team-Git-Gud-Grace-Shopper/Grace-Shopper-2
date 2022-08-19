const client = require('../client');

async function createCartOrder (id) {
    try {
        const { rows: [cart_orders] } = await client.query(`
            INSERT INTO cart_orders ("userId", "orderStatus")
            VALUES ($1, $2)
            WHERE "userId" = ${id}
            RETURNING *
        `, [id])
        return cart_orders
    } catch (error) {
        
    }
}


module.exports = {
    createCartOrder
}