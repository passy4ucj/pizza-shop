const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { sequelize } = require('./models')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')


// Creating an express app
const app = express()

// Initializing dotenv
//Load env vars
dotenv.config({ path: './config/env.env' })

// Route files
const orders = require('./routes/orderRoutes')

// Using JSON parser
app.use(express.json())

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/orders', orders)

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})


//Use error Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
// App Listener

module.exports = app