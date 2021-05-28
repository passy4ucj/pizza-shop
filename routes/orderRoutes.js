const express = require('express')
const { createOrder, updateOrder, getOrders, deleteOrder } = require('../controllers/orderController')

const router = express.Router()


router.route('/')
    .post(createOrder)
    .get(getOrders)

router.route('/:id')
    .put(updateOrder)
    .delete(deleteOrder)

module.exports = router