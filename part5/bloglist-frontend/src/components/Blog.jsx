import { useEffect, useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }
  const [like,setLike] = useState(blog.likes)
  
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

  return (
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
      </div>
    </div>
  )
}

export default Blog