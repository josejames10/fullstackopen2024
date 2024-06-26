import { useState } from "react"

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        like: {blog.likes}
        <button>like</button>
      </div>
    </div>
  )
}

export default Blog