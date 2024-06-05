import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

    if (loggedUserJSON) {
      const login = JSON.parse(loggedUserJSON)
      setUser(login)
      //  blogService.setToken(user.token)
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
        <></>

      </div>
      }
    </div>
  )
}

export default App