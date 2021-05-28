const { Order, OrderItems } = require('../models')
const asyncHandler = require('express-async-handler')
const { uuid } = require('uuidv4')

const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItemss,
        customerName,
        address,
        status,
        totalAmount
    } = req.body
    const uuidID = uuid()


    try {
        const order = await Order.create({
            orderID: uuidID,
            customerName,
            address,
            status,
            totalAmount
        })

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

const updateOrder = asyncHandler(async (req, res) => {

    const {
        status
    } = req.body

    try {
        const updatedOrder = await Order.update({ status }, {
            where: {
                orderID: req.params.id
            }
          });
    
        res.json({
            success: true,
            updatedOrder
        })
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error(`Server error`)
    }
    
  
})

const getOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.findAll({})

        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        res.status(500)
        throw new Error('No orders')
    }
})

const deleteOrder = asyncHandler(async (req, res) => {
    try {
        await Order.destroy({
            where: {
                orderID: req.params.id
            }
        })

        await OrderItems.destroy({
            where: {
                order_uuid: req.params.id
            }
        })

        res.json({
            success: true
        })
    } catch (error) {
        
    }
})



module.exports = {
    createOrder,
    updateOrder,
    getOrders,
    deleteOrder
}