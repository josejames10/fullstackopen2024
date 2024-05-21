const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blog')
    console.log(users)
    response.json(users)
})

userRouter.post('/', async (request, response) => {
  console.log(request.body.password.length)
  if(request.body.password.length<3){
    return response.status(400).json({error: 'enter more than three characters password'})
  }
  const {username, name, password} = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username, 
    name, 
    passwordHash
})
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter

/* {
  "title": "request.body.title",
      "author": "request.body.author",
      "url": "request.body.url",
      "likes": 12,
      "userId": "664ac6e47947d7714af9bc9d"
          } 
          
   {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc2UxMCIsImlkIjoiNjY0Yjc2NzEyYWE3ZjlhZTY0ZThiOGU3IiwiaWF0IjoxNzE2MjIyMzg1fQ.piUduTj0xEgG0J-XvXmcPf3z6VwnvA7BJVO2Y_3_3JU",
    "username": "jose10",
    "name": "jose"
}       
{
  "title": "tiatu",
    "url": "titau",
    "author":"jamaes",
    "likes":14
          } 
          */