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
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash("password", 10)
  const user = new User({
    username:"luis",
    name:"luis", 
    passwordHash
})

  await user.save()
  const userGet = await User.find({})
  await Blog.deleteMany({})
  helper.initialBlog[0].user=userGet[0]._id.toString()
  helper.initialBlog[1].user=userGet[0]._id.toString()
  const blogObjects = helper.initialBlog
    .map(blog =>new Blog(blog)) 
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
// refactori 4.23
test('a valid blog can be added ', async () => {
  const token=await helper.tokenGet()
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
}
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  const titles = blogAtEnd.map(r => r.title)
  assert.strictEqual(blogAtEnd.length, helper.initialBlog.length + 1)
  assert(titles.includes('Canonical string reduction'))
})
//4.11*: Blog List Tests, step 4
test('averify that the like property has 0 if it is not filled', async () => {
    const token = await helper.tokenGet()
    
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 0
}
const blog =await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  console.log('likes',blog.body.likes)
  assert.strictEqual(blogAtEnd.length, helper.initialBlog.length + 1)
  assert.strictEqual(blog.body.likes,0)
})

//4.12*: Blog List tests, step 5
test('If the title or url properties do not exist, the server responds with the status code 400', async () => {
  const token = await helper.tokenGet()
  
  const newBlog = {
    author: 'blog3'
  }
   await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)

    const blogAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogAtEnd.length, helper.initialBlog.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]._id.toString()
  blogsAtStart[0]._id=blogsAtStart[0]._id.toString()
  blogsAtStart[0].user=blogsAtStart[0].user.toString(9)
  
  const resultBlog = await api
    .get(`/api/blogs/${blogToView}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    console.log("1:",resultBlog.body)
    console.log("2:",blogsAtStart[0])

  assert.deepStrictEqual(resultBlog.body, blogsAtStart[0])
})

//4.13 Blog List Expansions, step 1
test('a blog can be deleted', async () => {

  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete=blogsAtStart[0]._id.toString()
  const token = await helper.tokenGet() 

  await api
    .delete(`/api/blogs/${blogToDelete}`)
    .set('Authorization', `bearer ${token}`)
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

test("There's a blog post uploaded without authorization", async () => {
    const usersAtStart = await User.find({})
    const newBlog = {
        author: "requesat.abody.author",
          url:"url",
          title:"juan",
        likes: 11
    }
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI0IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc2UxMCIsImlkIjoiNjY0Yjc2NzEyYWE3ZjlhZTY0ZThiOGU3IiwiaWF0IjoxNzE2Nzg3ODIxLCJleHAiOjE3MTY3OTE0MjF9.xCvOtKalk0V_FMPEQCqky3RbU02F6teOX_Vuymf3_5A"
    const result = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(401)
    
    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('token invalid'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })


after(async () => {
  await mongoose.connection.close()
})