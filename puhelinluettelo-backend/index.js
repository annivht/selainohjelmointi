
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

// muutetaan pyynnön json-data javascriptiksi
app.use(express.json())

// sallitaan pyynnöt frontendistä
app.use(cors())

// morgan näyttää pyynnöt terminaalissa
app.use(morgan('tiny'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '045-987654'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '050-555555'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '044-123123'
  }
]

// get palauttaa kaikki henkilöt
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// get/info näyttää hklöiden määrän ja ajan
app.get('/info', (request, response) => {
  const date = new Date()

  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

// get hakee yhden henkilön id:n perusteella
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// delete poistaa henkilön id:n perusteella
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// post lisää uuden henkilön
app.post('/api/persons', (request, response) => {
  const body = request.body

  // tarkistetaan että nimi ja numero löytyy
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  // tarkistetaan ettei nimi ole jo listalla
  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

// palvelin käyntiin
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
