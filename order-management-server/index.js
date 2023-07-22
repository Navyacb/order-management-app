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

app.get('/menu-list',async(req,res)=>{
    try{
        const response = await Menu.find()
        res.json(response)
    }
    catch(error){
        res.json(error)
    }
})

app.post('/add-menu',async(req,res)=>{
    const body = req.body
    try{
        const response = await Menu.create(body)
        res.json(response)
    }
    catch(error){
        res.json(error)
    }
})

app.get('/search-menu',async(req,res)=>{
    const name = req.query.name
    try{
        const response = await Menu.find()
        const result = response.filter(res=> res.name.toLowerCase().includes(name.toLowerCase()))
        res.json(result)
    }
    catch(error){
        res.json(error)
    }
})

app.get('/order-list',async(req,res)=>{
    try{
        const response = await Order.find({isCompleted:false})
        res.json(response)
    }
    catch(error){
        res.json(error)
    }
})

app.post('/add-order',async(req,res)=>{
    try{
        const body = req.body
        const response = await Order.create(body)
        res.json(response)
    }
    catch(error){
        res.json(error)
    }
})

app.put('/order/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const body = req.body
        const response = await Order.findByIdAndUpdate(id,body,{new:true, runValidators: true})
        res.json(response)
    }
    catch(error){
        res.json(error)
    }
})


app.listen(PORT,()=>{
    console.log(`Server is up and running on PORT ${PORT}`)
})