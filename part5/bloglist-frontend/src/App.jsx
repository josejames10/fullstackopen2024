import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogVisible, setBlogVisible] = useState(false)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => (b.likes || 0) - (a.likes || 0)))
    )
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const loginForm = () => (

    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleCreate = async (blogObject) => {
    /* event.preventDefault()
    const newObject = {
      title: create.title,
      author: create.author,
      url: create.url,
    } */
    const returnBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnBlog))
    // setErrorMessage(`a new blog ${create.title} by ${create.author}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const handleLikes = async () => {
    /* event.preventDefault()
    const newObject = {
      title: create.title,
      author: create.author,
      url: create.url,
    } */

    const returnBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnBlog))
    // setErrorMessage(`a new blog ${create.title} by ${create.author}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

  }
  const createBlog = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            handleSubmit={handleCreate}
          ></BlogForm>
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={() => {
          window.localStorage.clear()
          setUser(null)
        }}>cerrar sesion</button>
        {blogs.map(blog =>
          <Blog key={blog._id} blog={blog} user={user.username}/>
        )}
        {createBlog()}
      </div>
      }
    </div>
  )
}

export default App