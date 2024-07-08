import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.error("Error al obtener datos:", error)
    throw error
  }
}

const create = async newObjeto => {
  const config = {
    headers : {Authorization : token},
  }
  const response = await axios.post(baseUrl, newObjeto, config)
  return response.data
}

const aumentarLike = async (id,newObjeto) =>{
 
  const response = await axios.put(`${baseUrl}/${id}`, newObjeto)
}

export default { getAll, setToken, create, aumentarLike}