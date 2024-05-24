import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blogData => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blogData, config)
  return response.data
}

const update = async (id, blogData) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogData, config)
  return response.data
}

export default { getAll, setToken, create, update }