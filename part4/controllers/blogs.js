const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/',(request, response) =>{
  Blog.find({}).then(blogs=>{
    response.json(blogs)
  })
})

blogRouter.get('/:id',(request, response, next) =>{
    Blog.findById(request.params.id)
    .then(blog=>{
     if(blog){
        response.json(blog)
     } else {
        response.status(404).end()
     }
    })
    .catch(e=>next(error))
})

blogRouter.post('/',(request, response, next)=>{
    const blog = new Blog(request.body)
    blog.save()
    .then(saveBlog => {
        response.json(saveBlog)
    })
    .catch(e => next(e))
})

blogRouter.delete('/:id',(request, response, next) =>{
    Blog.findByIdAndDelete(request.params.id)
    .then(() => {
        response.status(204).end()
    })
    .catch(e=>next(e))
})

blogRouter.put('/:id',(request, response, next) =>{
    Blog.findByIdAndUpdate(request.params.id,request.body,{new: true})
    .then(updatedBlog =>{
        response.json(updatedBlog)
    })
    .catch(e=>next(e))
})

module.exports = blogRouter