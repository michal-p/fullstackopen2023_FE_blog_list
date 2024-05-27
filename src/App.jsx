import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NotificationMessage from './components/NotificationMessage'
import BlogCreateForm from './components/BlogCreateForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState(null)

  const blogFormRef = useRef(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, []) // This effect runs only once after the initial render, setting up the user from local storage if available.

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notificationMessage('Successfully logged in!', 'success')
    } catch (exception) {
      notificationMessage('Wrong credentials!', 'error')
    }
  }

  const addBlog = async (formData) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(formData)
      setBlogs(blogs.concat(returnedBlog))
      notificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added!`, 'success')
    } catch (error) {
      notificationMessage(`Blog '${formData.title}' was not created!`, 'error')
      if (error.response.status === 401) handleLogout()
    }
  }

  const notificationMessage = (message, type) => {
    setTypeMessage(type)
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const blogUpdate = async (updatedBlog) => {
    const { user, ...blogData } = updatedBlog
    try {
      const respondedBlog = await blogService.update(blogData.id, blogData)
      setBlogs(blogs.map(b => b.id !== respondedBlog.id ? b : respondedBlog))
      notificationMessage(`A new blog ${ respondedBlog.title } by ${ respondedBlog.author } updated!`, 'success')
    } catch (error) {
      notificationMessage(`Blog ${ blogData.title } was not updated!`, 'error')
      if (error.response.status === 401) handleLogout()
    }
  }

  const deleteBlog = async (id, title) => {
    try {
      await blogService.remove(id)
      notificationMessage(`Deleted ${title}`, 'success')
    } catch (error) {
      notificationMessage('The blog was not deleted from server.', 'error')
      if (error.response.status === 401) handleLogout()
    }
    setBlogs(blogs.filter(b => b.id !== id))
  }

  return (
    <div>
      <NotificationMessage message={errorMessage} typeMessage={typeMessage} />
      { user === null
        ?
        <Login handleLogin={handleLogin}/>
        :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>Logout</button>
          <h2>Create blog</h2>
          <Togglable buttonLabel='Create blog' ref={blogFormRef}>
            <BlogCreateForm addNewBlog={addBlog} />
          </Togglable>
        </div>
      }
      <h1>blogs</h1>
      { blogs.map(blog => <Blog key={ blog.id } blog={ blog } blogUpdate={ blogUpdate } user={ user } onDelete={deleteBlog}/>) }
    </div>
  )
}

export default App