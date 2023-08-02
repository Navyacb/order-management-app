const express = require('express')
const configureDB = require('./config/database')
const cors = require('cors')
const menuController = require('./App/controllers/menuController')
const orderController = require('./App/controllers/orderController')
const app = express()
const PORT = 3030
configureDB()
app.use(express.json())
app.use(cors())

app.get('/menu-list',menuController.getMenu)

app.post('/add-menu',menuController.addMenu)

app.get('/search-menu',menuController.searchMenu)

app.get('/order-list',orderController.orderList)

app.post('/add-order',orderController.addOrder)

app.put('/order/:id',orderController.orderById)


app.listen(PORT,()=>{
    console.log(`Server is up and running on PORT ${PORT}`)
})