const Menu = require('../models/menu')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

module.exports = Order