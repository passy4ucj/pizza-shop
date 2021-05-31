const request = require('supertest')
const app = require('../app')

test('Hello World', () => {

})

test('Shoul place an order', async () => {
    await (await request(app).post('/api/v1/orders')).send({
        orderItemss: [
            {
                pizzaType: "Magarita",
                size: 3,
                quantity: 2,
                subTotal: 245
            },
            {
                pizzaType: "Samarita",
                size: 3,
                quantity: 2,
                subTotal: 245
            },
            {
                pizzaType: "Passrita",
                size: 3,
                quantity: 2,
                subTotal: 245
            }
        ],
        customerName: "Pascal",
        address: "Lagos",
        status: "delivering",
        totalAmount: 230
    }).expect(200)
})