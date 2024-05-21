const { test, after, beforeEach, describe } = require('node:test')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('../test/test_helper')
const bcrypt = require('bcrypt')

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
  const userId= await helper.usersInDb()
  console.log("id",userId)
  const Id = userId[0].id
  console.log("id__",Id)

  const newBlog = {
    title: 'blog lol',
    author: 'blog3',
    url: 'url3',
    likes: 23,
    user: userId
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

//4.13 Blog List Expansions, step 1
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

//4.14 Blog List Expansions, step 2
test('update information for an individual blog post',async () =>{
  const newBlog =   {
    title: 'blog',
    author: 'blog',
    url: 'url',
    likes: 100
  }
  const blogsAtStart = await helper.blogsInDb()
  const blogUpdate = blogsAtStart[0]
  blogUpdate._id= blogUpdate._id.toString()

  await api
    .put(`/api/blogs/${blogUpdate._id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd[0].likes, 100)
})
describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await  User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'root',
      passwordHash
    })

    await user.save()
  })
   test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'newuser',
      name: 'newuser',
      password: 'salainen'
    }
    await api
     .post('/api/users')
     .send(newUser)
     .expect(201)
     .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert.equal(usersAtEnd.length, usersAtStart.length + 1)
    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
   })
   test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    console.log('usersAtStart',usersAtStart)
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

describe('when new users are created',() =>{
  beforeEach(async () => {
    await  User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'root',
      passwordHash
    })
    await user.save()
  })

  test('a user is not created with an invalid username', async () => {
    const usersAtStart = await User.find({})
    const newUser = {
      username: 'ro',
      password: 'password'
    }
    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('User validation failed: username: Path `username`'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  test('a user is not created with an invalid password', async () => {
    const usersAtStart = await User.find({})
    const newUser = {
      username: 'jose',
      password: 'pa'
    }
    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('enter more than three characters password'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})