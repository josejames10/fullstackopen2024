
import axios from 'axios'
const Url = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(Url)
    return request.then(response => response.data)
  }

const create = newObject =>{
    const request = axios.post(Url,newObject)
    return request.then(response => response.data)
}
const remove = id =>{
    const request = axios.delete(`${Url}/${id}`)
    return request.then(response => response.data)
}
export default {
    getAll : getAll,
    create : create,
    remove :remove
}