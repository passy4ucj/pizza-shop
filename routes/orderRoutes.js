const express = require('express')
const { createOrder, updateOrder, getOrders, deleteOrder, getOrder } = require('../controllers/orderController')

const router = express.Router()


router.route('/')
    .post(createOrder)
    .get(getOrders)

router.route('/:id')
    .get(getOrder)
    .put(updateOrder)
    .delete(deleteOrder)
    

module.exports = router