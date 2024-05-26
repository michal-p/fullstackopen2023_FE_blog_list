import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const config = token => ({ headers: { Authorization: token }})

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blogData => {
  const response = await axios.post(baseUrl, blogData, config(token))
  return response.data
}

const update = async (id, blogData) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogData)
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config(token))
}

export default { getAll, setToken, create, update, remove }