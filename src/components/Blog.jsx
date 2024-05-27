import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogUpdate, user, onDelete }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleView = () => {
    setViewDetails(!viewDetails)
  }

  const handleLikes = () => {
    blogUpdate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    const isConfirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (isConfirmed) {
      onDelete(blog.id, blog.title)
    }
  }

  const showWhenUserOwnsBlog = {
    display: user && blog.user && blog.user.id === user.id ? '' : 'none'
  }

  return (
    <div style={ blogStyle } >
      <div>
        { blog.title } { blog.author }
        <button onClick={ handleView }>
          { viewDetails ? 'hide' : 'view' }
        </button>
      </div>
      { viewDetails && (
        <>
          <div>{ blog.url }</div>
          <div>
            { blog.likes }
            <button onClick={handleLikes}>likes</button>
          </div>
          <div>{ blog.user && blog.user.username }</div>
          <button style={ showWhenUserOwnsBlog } onClick={ handleDelete }>Delete</button>
        </>
      ) }
    </div>
  )
}

Blog.propTypes = {
  blogUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog