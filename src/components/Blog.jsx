import React, { useState } from 'react'

const Blog = ({ blog, blogUpdate }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleView = () => {
    setView(!view)
  }

  const handleLikes = () => {
    blogUpdate({ ...blog, likes: blog.likes + 1 })
  }

  return (
    <div style={ blogStyle } >
      <div>
        { blog.title } { blog.author } 
        <button onClick={ handleView }>
          { view ? 'hide' : 'view' }
        </button>
      </div>
      { view && (
        <>
          <div>{ blog.url }</div>
          <div>
            { blog.likes }
            <button onClick={handleLikes}>likes</button>
          </div>
          <div>{ blog.user && blog.user.username }</div>
        </>
      ) }
    </div>  
  )
}

export default Blog