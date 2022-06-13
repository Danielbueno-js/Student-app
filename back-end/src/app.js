// config inicial 
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()

const cors = require("cors")
 
// leitor do JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use(cors({
    origin: "*",
    credentials: true
  
  }))

//rotas da API
const studentRoutes = require('./routes/studentRoutes')
const res = require('express/lib/response')
app.use('/student', studentRoutes)

// Porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)


mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@api.lwtabqk.mongodb.net/dbpi?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log('conectado ao DB!')
        app.listen(3333)        
    })
    .catch((err) => console.log(err))
