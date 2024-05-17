const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/',async(request, response) =>{
    const blog = await Blog.find({})
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
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
    })
    const saveBlog = await blog.save()
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