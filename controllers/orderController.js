const { Order, OrderItems } = require('../models')
const asyncHandler = require('express-async-handler')
const { uuid } = require('uuidv4')


// var numbers = [65, 44, 12, 4];
// numbers.forEach(myFunction)

// function myFunction(item, index, arr) {
//   arr[index] = item * 10;
// }

const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItemss,
        customerName,
        address,
        status,
        totalAmount
    } = req.body
    const uuidID = uuid()


    // const addItems = (item) => {
    //     const added = await OrderItems.create({
    //         pizzaType: item.pizzaType,
    //         size: item.size,
    //         quantity: item.quantity,
    //         subTotal: item.subTotal,
    //         order_uuid: uuidID
    //     })
    //     return added;
    // }

    try {
        const order = await Order.create({
            orderID: uuidID,
            customerName,
            address,
            status,
            totalAmount
        })
        // const itemss = OrderItems.bulkCreate(orderItemss)

        // numbers.forEach(myFunction)

        orderItemss.map(async(item) => {
            await OrderItems.create({
                pizzaType: item.pizzaType,
                size: item.size,
                quantity: item.quantity,
                subTotal: item.subTotal,
                order_uuid: uuidID
            })
        })



        res.json({
            success: true,
            order
        })
    } catch (error) {
        console.log(error)
        
        res.status(500)
        throw new Error(`Server error`)
    }


})



module.exports = {
    createOrder
}