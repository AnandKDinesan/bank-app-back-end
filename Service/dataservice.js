//import db.js

const db = require("./db")

//import jsonwebtoken

const jwt = require('jsonwebtoken')



//register

register = (acno, uname, psw) => {

  return db.User.findOne({ acno }).then(user => {
    if (user) {
      return {
        statusCode: 401,
        status: false,
        message: "user already exist"
      }
    }
    else {
      const newuser = new db.User({
        acno,
        username: uname,
        password: psw,
        balance: 0,
        transaction: []
      })

      newuser.save()

      return {
        statusCode: 200,
        status: true,
        message: "registration success"
      }
    }
  })
}

login = (acno, psw) => {

  return db.User.findOne({acno,password:psw}).then(user=>{
    if(user){
      const token = jwt.sign({ currentAcno: acno }, 'secretkey123')
      return {
        statusCode: 200,
        status: true,
        message: "login success",
        currentAcno:acno,
        currentUser:user.username,
        token
      }
    }
    else{
      return {
        statusCode: 401,
        status: false,
        message: "incorrect account no password"


      }
    }
  })
}
deposit = (acno, password, amount) => {

  var amt = parseInt(amount)

  return db.User.findOne({acno,password}).then(user=>{
    if(user){
      user.balance += amt
      user.transaction.push({ type: "CREDIT", amount: amt })
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: `${user.balance}`
      }
      
    }
    else
    {
      return{
        statusCode: 401,
        status: false,
        message: "incorrect account number or password"
      }
    }
    
  })

 
}

withdraw = (acno, password, amount) => {

  var amnt = parseInt(amount)
  return db.User.findOne({acno,password}).then(user=>{
    if(user){
      if(amnt>user.balance)
      return{
        statusCode: 401,
        status: false,
        message: "insufficient balance"
      }
      else{
        user.balance -= amnt
      user.transaction.push({ type: "DEBIT", amount: amnt })
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: user.balance
      }
      }
      
    }
    else{
      return{
        statusCode: 401,
        status: false,
        message: "incorrect account number or password"
      }
    }
  })
  

}
gettransaction = (acno) => {

  return db.User.findOne({acno}).then(user=>{
    if(user){
      return {
        statusCode: 200,
        status: true,
        message: user.transaction
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: "incorrect account number"
      }
    }
  })
  
}
acdelete=(acno)=>{
  return db.User.deleteOne({acno}).then(user=>{
    if(user){
      return {
        statusCode: 200,
        status: true,
        message: "account deleted"
      }
    }
    else{
      return{
        statusCode: 401,
        status: false,
        message: "incorrect account number"
      }
    }
  })
}
module.exports = {
  register, login, deposit, withdraw, gettransaction,acdelete
}