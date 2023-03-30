//server mongodb integration

//1.import mongoose
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
//2.state connection string via mongoose

mongoose.connect('mongodb://localhost:27017/bankServer', { useNewUrlParser: true })

//3.define a bankdatabase model

const User = mongoose.model('User', {
  acno: Number,
  username: String,
  password: Number,
  balance: Number,
  transaction: []

})

//export the schema to use in another files
module.exports={
  User
}
