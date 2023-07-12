const mongoose = require('mongoose')
const configureDB = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/order-management')
    .then(()=>{
        console.log('db is connected')
    })
    .catch((error)=>{
        console.log('db Connection',error)
    })
}

module.exports = configureDB