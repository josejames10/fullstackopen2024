const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const {info, error} = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const mongoose =require('mongoose')
mongoose.set('strictQuery',false)
mongoose.connect(config.MONGODB_URI).then(result =>{
    info('connected to MongoDB')
})
.catch(e =>{
    error('error connected to MongoDB',e.message)
})
app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogRouter)

module.exports = app
