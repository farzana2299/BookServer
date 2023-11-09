require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./router/router')
require('./database/database')
const jwt= require('jsonwebtoken')

 const server=express()
 server.use(cors())
 server.use(express.json())
server.use(router)
server.use(jwt)

const port=4000||Process.env.port
server.listen(port,()=>{
    console.log(`-------Server started at the port ${port}`);
})
server.get('/', (req, res) => {
    res.send('Server runs smoothly');
})

