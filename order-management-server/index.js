const express = require('express')
const configureDB = require('./config/database')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = 3030
configureDB()
app.use(express.json())
app.use(cors())

const Schema = mongoose.Schema

const menuSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    menuType : {
        type:String,
        required:true,
        enum:['Food','Drink']
    },
    price : {
        type:Number,
        required : true,
        min : 1
    }
},{timestamps:true})

const Menu = mongoose.model('Menu', menuSchema)

const orderSchema = new Schema({
    menuItem : {
        type: Schema.Types.ObjectId,
        required:true,
        ref : Menu
    },
    isCompleted : {
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Order = mongoose.model('Order',orderSchema)

app.get('/menu-list',(req,res)=>{
    console.log('inside')
    Menu.find()
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
})

app.post('/add-menu',(req,res)=>{
    const body = req.body
    Menu.create(body)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
})

app.get('/search-menu',(req,res)=>{
    const name = req.query.name
    Menu.find()
    .then((response)=>{
        const result = response.filter(res=> res.name.toLowerCase().includes(name.toLowerCase()))
        res.json(result)
    })
    .catch((error)=>{
        res.json(error)
    })
})

app.get('/order-list',(req,res)=>{
    Order.find({isCompleted:false})
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
})

app.post('/add-order',(req,res)=>{
    const body = req.body
    Order.create(body)
    .then(response=>{
        res.json(response)
    })
    .catch(error=>{
        res.json(error)
    })
})

app.put('/order/:id',(req,res)=>{
    const id = req.params.id
    const body = req.body
    Order.findByIdAndUpdate(id,body)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
})


app.listen(PORT,()=>{
    console.log(`Server is up and running on PORT ${PORT}`)
})