import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [user, setUser] = useState(null)
  const [create, setCreate] = useState({ title: "", author: "", url: "" })

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
      setBlogs(blogs)
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
      console.log(exception)
      console.log('login no iniciado')
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
      <button type="submit">create</button>
    </form>
  )

  const handleCreate = async (event) => {
    event.preventDefault()
    const newObject = {
      title: create.title,
      author: create.author,
      url: create.url,
    }
    const returnBlog = await blogService.create(newObject)
    setBlogs(blogs.concat(returnBlog))
    setCreate({ url: "", author: "", title: "" })
  }

  const createBlog = () => (
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          type="text"
          name="Title"
          value={create.title}
          onChange={({ target }) => setCreate({ ...create, title: target.value })}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="Author"
          value={create.author}
          onChange={({ target }) => setCreate({ ...create, author: target.value })}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="Url"
          value={create.url}
          onChange={({ target }) => setCreate({ ...create, url: target.value })}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && <div>
        <h2>blogs</h2>
        <button onClick={() => {
          window.localStorage.clear()
          setUser(null)
        }}>cerrar sesion</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

        {createBlog()}
      </div>
      }
    </div>
  )
}

export default App