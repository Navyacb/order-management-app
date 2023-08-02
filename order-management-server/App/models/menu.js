const mongoose = require('mongoose')
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

module.exports = Menu