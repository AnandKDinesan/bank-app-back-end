//import cors
const cors=require('cors')

//import dataService file from service folder
const dataService= require('./Service/dataservice')

//import express
const express=require('express')
// const {json}=require('express')

//create app

const app=express()

//connect frontend

app.use(cors({origin:'http://localhost:4200'}))
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
    dataService.register(req.body.acno,req.body.uname,req.body.psw).then(result=>{
    res.status(result.statusCode).json(result)
   })
   
    
    console.log(req.body);
})

//login
app.post('/login',(req,res)=>{
    const result= dataService.login(req.body.acno,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
        console.log(req.body);
    })
})

 //deposit
 app.post('/deposit',jwtmiddleware,(req,res)=>{
    const result= dataService.deposit(req.body.acno,req.body.psw,req.body.amount).then(result=>{
    res.status(result.statusCode).json(result)
    console.log(req.body);
    })
    
    
 })

 //withdraw
 app.post('/withdraw',jwtmiddleware,(req,res)=>{
    const result= dataService.withdraw(req.body.acno,req.body.psw,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
        console.log(req.body);
    })
    
     
 })

 //transaction details
 app.post('/transaction',jwtmiddleware,(req,res)=>{
    const result= dataService.gettransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
     console.log(req.body);
    })
    
     
 })

//delete               //params
app.delete('/deleteacc/:acno',jwtmiddleware,(req,res)=>{
    dataService.acdelete(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
 app.listen(3001,()=>{
    console.log("Server satrted at port number 3001");
})