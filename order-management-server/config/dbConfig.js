const mongoose = require('mongoose')
const configDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/order-management')
    .then(()=>{
        console.log('db connected')
    })
    .catch((error)=>{
        console.log('db connection error',error)
    })
}

module.exports = configDB