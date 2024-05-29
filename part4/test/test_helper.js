const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


const initialBlog = [
  {
      title: 'blog',
      author: 'blog',
      url: 'url',
      likes: 2,
    
  },
  {
      title: 'blog2',
      author: 'blog2',
      url: 'url2',
      likes: 3
  }
]

const tokenGet = async () => {
  const newLogin = {
    username: "luis",
    password: "password"
  }
  let token=""
    await api.post('/api/login').send(newLogin)
    .expect(res=>{
      token = res.body.token})
    return token
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'blog lol',
    author: 'blog3',
    url: 'url3',
    likes: 23
})
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlog, nonExistingId, blogsInDb, usersInDb,tokenGet
}
