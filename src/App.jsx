import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogCreateForm from './components/BlogCreateForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const loggedUser = JSON.parse(loggedUserJSON)
    setUser(loggedUser)
    blogService.setToken(loggedUser.token)
  }
}, []) // This effect runs only once after the initial render, setting up the user from local storage if available.

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const addBlog = async (formData) => {
    try {
      const returnedBlog = await blogService.create(formData)
      // notificationMessage(`Added ${returnedBlog.content}`, 'success')
      setBlogs(blogs.concat(returnedBlog))
    } catch (error) {
      console.log(`Blog '${formData.title}' was not created`)
      // notificationMessage(`Blog '${formData.title}' was not created`, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
       {user === null ?
        <Login 
          password={password}
          username={username}
          handleLogin={handleLogin}
          setPassword={setPassword}
          setUsername={setUsername}
        /> :
        <div>
          <p>{user.name} logged-in</p>
          <h2>Create blog</h2>
          <BlogCreateForm addNewBlog={addBlog} />
          <button onClick={handleLogout}
          >Logout</button>
        </div>
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App