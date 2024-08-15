import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author but no URL or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michal',
    url: 'www.blog.com',
    likes: 5
  }

  const { container } = render(<Blog blog={blog}/>)
  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')

  //* screen.debug(li) -> Object screen has method debug that can be used to print the HTML of a component to the terminal.
  expect(title).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(author).toHaveTextContent('Michal')
  expect(url).toBeNull()
  expect(likes).toBeNull()


  //* Different way how to find text in screen
  // const element = screen.getByText('Component testing is done with react-testing-library')
  // expect(element).toBeDefined()
})

test('render URL or likes after show button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michal',
    url: 'www.blog.com',
    likes: 5
  }

  const { container } = render(<Blog blog={blog} />)
  const show = userEvent.setup()
  const button = screen.getByText('view')

  await show.click(button)

  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')

  expect(url).not.toBeNull()
  expect(likes).not.toBeNull()
})

test('check likes button if it is clicked twice then likes event handler is run twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michal',
    url: 'www.blog.com',
    likes: 5
  }
  const mockHandler = vi.fn()
  render(<Blog blog={blog} blogUpdate={mockHandler} />)
  const handleClick = userEvent.setup()
  const buttonShow = screen.getByText('view')
  await handleClick.click(buttonShow)
  const button = screen.getByText('likes')
  await handleClick.click(button)
  await handleClick.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})