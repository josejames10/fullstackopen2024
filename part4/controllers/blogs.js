const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/',async(request, response) =>{
    const blog = await Blog.find({}).populate('user',{username:1,name:1})
    console.log(blog);
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
    if (!request.body.title || !request.body.url) {
        response.status(400).end()
    } else {
        console.log("id:::",request.body.userId)
        const user = await User.findById(request.body.userId)
        console.log("id:::",user._id)
    
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: user._id.toString()
    })
    const saveBlog = await blog.save()
    user.blog = user.blog.concat(saveBlog._id)
    await user.save()
    response.status(201).json(saveBlog)
}
})

blogRouter.delete('/:id',async(request, response) =>{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id',async(request, response) =>{
    const updateBlog = await Blog.findByIdAndUpdate(request.params.id,request.body,{new: true})
        console.log(updateBlog)
        response.json(updateBlog)
})

module.exports = blogRouter