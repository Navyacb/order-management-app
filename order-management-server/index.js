const express = require('express')
const configDB = require('./config/dbConfig')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 3030
const app = express()
configDB()
app.use(express.json())
app.use(cors())

const Schema = mongoose.Schema

const menuSchema = new Schema({
    name : {
        type: String,
        required : true
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
        console.log(response)
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
})

app.post('/add-menu',(req,res)=>{
    const body = req.body
    const menu = new Menu(body)
    menu.save()
    .then((response)=>{
        res.json(response)
    })
    .error((error)=>{
        res.json(error)
    })
})

app.get('/order-list',(req,res)=>{
    Order.find()
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
})


app.listen((PORT,()=>{
    console.log(`Server is up and running on PORT ${PORT}`)
}))