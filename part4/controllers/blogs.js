const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/',async(request, response) =>{
    const blog = await Blog.find({}).populate('user',{username:1,name:1})
    response.json(blog)
})

blogRouter.get('/:id',async(request, response) =>{
    const blog = await Blog.findById(request.params.id)
    if(blog){
    response.json(blog)
    } else {
        response.status(404).end()
    }
    })
    
blogRouter.post('/',async(request, response)=>{
    
    const user =request.user

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: user._id
    })
    const saveBlog = await blog.save()
    user.blog = user.blog.concat(saveBlog._id)
    await user.save()
    response.status(201).json(saveBlog)
})


blogRouter.delete('/:id',async(request, response) =>{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
     response.status(401).json({error: ' token invalid ' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    if (user.id.toString()!== blog.user.toString()){
        response.status(401).json({error: ' token invalid ' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id',async(request, response) =>{
    const updateBlog = await Blog.findByIdAndUpdate(request.params.id,request.body,{new: true})
        console.log(updateBlog)
        response.json(updateBlog)
})

module.exports = blogRouter