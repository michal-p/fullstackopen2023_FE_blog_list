import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogCreateForm from './BlogCreateForm'

test('check the form calls the event handler it received as props with the right details on create.', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michal',
    url: 'www.blog.com'
  }
  const addNewBlog = vi.fn()
  const handleSubmit = userEvent.setup()

  render(<BlogCreateForm addNewBlog={ addNewBlog } />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const buttonAdd = screen.getByText('add')

  await userEvent.type(titleInput, blog.title)
  await userEvent.type(authorInput, blog.author)
  await userEvent.type(urlInput, blog.url)

  await handleSubmit.click(buttonAdd)

  expect(addNewBlog).toHaveBeenCalledTimes(1)
  expect(addNewBlog).toHaveBeenCalledWith({
    title: 'Component testing is done with react-testing-library',
    author: 'Michal',
    url: 'www.blog.com'
  })
})