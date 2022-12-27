//import dataService file from service folder
const dataService= require('./Service/dataservice')

//import express
const express=require('express')

//create app

const app=express()

//import jsonwebtokent

const jwt=require('jsonwebtoken')

//middleware creating for verify token

const jwtmiddleware=(req,res,next)=>{
    console.log("router specific middleware...");
    try{
        const token=req.headers['access-token']
        const data= jwt.verify(token,"secretkey123")
        console.log(data);
        next()
    }
    catch{
       res.status(422).json( {
            statusCode:422,
            status:false,
            message:"plesase login"
        })
    } 
}
//to convert json datas
app.use(express.json())

//get
// app.get('/',(req,res)=>{res.send('Get method checking.....')})

//set port
app.listen(3000,()=>{
    console.log("Server satrted at port number 3000");
})

//request

// //POST
// app.post('/',(req,res)=>{res.send('post method checking.....')})

// //put
// app.put('/',(req,res)=>{res.send('put method checking.....')})

// //patch
// app.patch('/',(req,res)=>{res.send('patch method checking.....')})

// //delete
// app.delete('/',(req,res)=>{res.send('Delete method checking.....')})

//register
app.post('/register',(req,res)=>{
   const result= dataService.register(req.body.acno,req.body.uname,req.body.psw)
   
    res.status(result.statusCode).json(result)
    console.log(req.body);
})

//login
app.post('/login',(req,res)=>{
    const result= dataService.login(req.body.acno,req.body.psw)
    
     res.status(result.statusCode).json(result)
     console.log(req.body);
 })

 //deposit
 app.post('/deposit',jwtmiddleware,(req,res)=>{
    const result= dataService.deposit(req.body.acno,req.body.psw,req.body.amount)
    
     res.status(result.statusCode).json(result)
     console.log(req.body);
 })

 //withdraw
 app.post('/withdraw',jwtmiddleware,(req,res)=>{
    const result= dataService.withdraw(req.body.acno,req.body.psw,req.body.amount)
    
     res.status(result.statusCode).json(result)
     console.log(req.body);
 })

 //transaction details
 app.post('/transaction',jwtmiddleware,(req,res)=>{
    const result= dataService.gettransaction(req.body.acno)
    
     res.status(result.statusCode).json(result)
     console.log(req.body);
 })