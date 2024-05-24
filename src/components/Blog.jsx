import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleView = (event) => {
    setView(!view)
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
            { blog.likes } <button>likes</button>
          </div>
          <div>{ blog.author }</div>
        </>
      ) }
    </div>  
  )
}

export default Blog