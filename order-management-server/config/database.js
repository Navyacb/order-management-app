const mongoose = require('mongoose')
const configureDB = async()=>{
    try{
        const connect = await mongoose.connect('mongodb://127.0.0.1:27017/order-management')
        console.log('db is connected')
    }
    catch(error){
        console.log('db Connection',error)
    }
    // mongoose.connect('mongodb://127.0.0.1:27017/order-management')
    // .then(()=>{
    //     console.log('db is connected')
    // })
    // .catch((error)=>{
    //     console.log('db Connection',error)
    // })
}

module.exports = configureDB