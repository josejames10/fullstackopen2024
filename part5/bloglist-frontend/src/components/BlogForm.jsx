import { useState } from 'react'


const BlogForm = ({ handleSubmit }) => {
  const [create, setCreate] = useState({ title: "", author: "", url: "" })
  const addBlog =  (event) => {
    event.preventDefault()
    handleSubmit({ 
      title: create.title,
      author: create.author,
      url: create.url})
      setCreate({ url: "", author: "", title: "" })

    
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          name="Title"
          value={create.title}
          onChange={({ target }) => setCreate({ ...create, title : target.value})}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="Author"
          value={create.author}
          onChange={({ target }) => setCreate({ ...create, author : target.value})}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="Url"
          value={create.url}
          onChange={({ target }) => setCreate({ ...create, url : target.value})}
        />
      </div>
      <button type="submit">create</button>
    </form>)
}

export default BlogForm