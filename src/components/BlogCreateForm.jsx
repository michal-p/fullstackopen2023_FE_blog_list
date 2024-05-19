import React, { useState } from 'react'

const AddBlog = ({ addNewBlog }) => {
  const [formData, setFormData] = useState({ title: '', url: '', author: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNewBlog(formData)
    setFormData({ title: '', url: '', author: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title: <input name="title" onChange={handleChange} value={formData.title}/>
      </div>
      <div>
        author: <input name="author" onChange={handleChange} value={formData.author}/>
      </div>
      <div>
        url: <input name="url" onChange={handleChange} value={formData.url}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddBlog