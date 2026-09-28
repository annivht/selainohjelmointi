import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

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

// päivittää olemassa olevan henkilön tiedot
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, remove, update }