const Order = require('../models/order')
const orderController = {}

orderController.addOrder = async(req,res)=>{
    try{
        const body = req.body
        const response = await Order.create(body)
        res.json(response)
    }
    catch(error){
        res.json(error)
    }
}

orderController.orderById = async(req,res)=>{
    try{
        const id = req.params.id
        const body = req.body
        const response = await Order.findByIdAndUpdate(id,body,{new:true, runValidators: true})
        res.json(response)
    }
    catch(error){
        res.json(error)
    }
}

orderController.orderList = async(req,res)=>{
    try{
        const response = await Order.find({isCompleted:false})
        res.json(response)
    }
    catch(error){
        res.json(error)
    }
}

module.exports = orderController