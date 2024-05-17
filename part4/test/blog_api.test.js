const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('../test/test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlog
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('blog are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
  
test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    
    assert.strictEqual(response.body.length, helper.initialBlog.length)
})
  
test('the first blog is about blog', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map(e => e.title )
    assert.strictEqual(title.includes('blog'), true)
  })

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'blog lol',
    author: 'blog3',
    url: 'url3',
    likes: 23
}

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()

  //const response = await api.get('/api/blogs')

  const titles = blogAtEnd.map(r => r.title)
   
  assert.strictEqual(blogAtEnd.length, helper.initialBlog.length + 1)

  assert(titles.includes('blog lol'))
})
//4.11*: Blog List Tests, step 4
test('averify that the like property has 0 if it is not filled', async () => {
  const newBlog = {
    title: 'blog lol',
    author: 'blog3',
    url: 'url3'
}

  const blog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()

  console.log('likes',blog.body.likes)
  assert.strictEqual(blogAtEnd.length, helper.initialBlog.length + 1)
  assert.strictEqual(blog.body.likes,0)
})

//4.12*: Blog List tests, step 5
test('If the title or url properties do not exist, the server responds with the status code 400', async () => {
  const newBlog = {
    author: 'blog3',
    likes: 1
  }
  const blog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    const blogAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogAtEnd.length, helper.initialBlog.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  let blogToView = blogsAtStart[0]
  blogToView._id = blogToView._id.toString()
  const resultBlog = await api
    .get(`/api/blogs/${blogToView._id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  blogToDelete._id= blogToDelete._id.toString()

  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const title = blogsAtEnd.map(r => r.title)
  assert(!title.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})