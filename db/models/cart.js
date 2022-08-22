const client = require('../client');

async function createCartOrder (userId, orderStatus) {
    try {
        const { rows: [cart_orders] } = await client.query(`
            INSERT INTO cart_orders ("userId", "orderStatus")
            VALUES ($1, $2)
            RETURNING *
        `, [userId, orderStatus])
        return cart_orders
    } catch (error) {
        
    }
}

async function createIndividualCartItems (productId, priceAtPurchase, cartId, quantity) {
    try {
        const { rows: [individual_cart_items] } = await client.query(`
            INSERT INTO individual_cart_items ("productId", "priceAtPurchase", "cartId", "quantity")
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [productId, priceAtPurchase, cartId, quantity])
        return individual_cart_items
    } catch (error) {
        
    }
}

async function deleteFromCart (id) {
    try {
        await client.query(`
            DELETE FROM individual_cart_items
            WHERE id=${id}
        `, [id])
    } catch (error) {
        
    }
}



//updateCartOrder, completeCartOrder

module.exports = {
    createCartOrder,
    createIndividualCartItems,
    deleteFromCart
}

