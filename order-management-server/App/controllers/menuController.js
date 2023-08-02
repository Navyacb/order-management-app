const Menu = require('../models/menu')
const menuController = {}

menuController.getMenu = async(req,res)=>{
    try{
        const response = await Menu.find()
        res.json(response)
    }
    catch(error){
        res.json(error)
    }
}

menuController.addMenu = async(req,res)=>{
    const body = req.body
    try{
        const response = await Menu.create(body)
        res.json(response)
    }
    catch(error){
        res.json(error)
    }
}

menuController.searchMenu = async(req,res)=>{
    const name = req.query.name
    try{
        const response = await Menu.find()
        const result = response.filter(res=> res.name.toLowerCase().includes(name.toLowerCase()))
        res.json(result)
    }
    catch(error){
        res.json(error)
    }
}

module.exports = menuController