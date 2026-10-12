
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

// hakee kaikki henkilöt palvelimelta
const getAll = () => {
  return axios.get(baseUrl)
}

// lisää uuden henkilön palvelimelle
const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

// poistaa henkilön palvelimelta id:n perusteella
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove }
