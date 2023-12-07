import axios from "axios"

const url = "http://localhost:3001/api"

const getAll = async () => {
  const request = await axios.get(`${url}/albums`)
  return request.data
}

export default { getAll }
