import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog , user }) => {
  const [view, setView] = useState(false)
  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }
  const [like,setLike] = useState(blog.likes)
  const [eliminar, setEliminar] = useState(true)
  const hideBlog = { display: eliminar ? '' : 'none' }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = async () => {
    let likes=like+1
    const newObject = {  
      _id: blog._id,
      user: blog.user.id,
      likes: likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      __v:blog.__v
    }
    const returnBlog = await blogService.aumentarLike(blog._id,newObject)
    setLike(likes)
  }
  const handleDelete = async () => {
    if (window.confirm(`Eliminarás el blog con el nombre ${blog.title}`)) {
      await blogService.deleteBlog(blog._id)
    }
    setEliminar(false)
  }

  return (
    <div style={hideBlog}>

    <div style={blogStyle}>
      {blog.title}
      <div style={hideWhenVisible}>
        <button onClick={() => { setView(true) }}>view</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={() => { setView(false) }}>hide</button><br/>
        {blog.author}<br/>
        {blog.url}<br/>
        like: {like}
        <button onClick={handleLikes}>like</button>
        <br/>
        {user === blog.user.username ? (
          <button onClick={handleDelete}>delete</button>
        ):<></>}
       
      </div>
    </div>
    </div>
  )
}

export default Blog