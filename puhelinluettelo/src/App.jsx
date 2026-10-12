
import { useState, useEffect } from 'react'
import personService from './services/persons'

// näyttää yhden henkilön tiedot ja delete-napin
const Person = ({ person, deletePerson }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </p>
  )
}

// näyttää kaikki henkilöt
const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) =>
        <Person
          key={person.id}
          person={person}
          deletePerson={deletePerson}
        />
      )}
    </div>
  )
}

// lomake uuden henkilön lisäämiseen
const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>

      <div>
        number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  // tilat henkilöille, nimelle ja numerolle
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // haetaan henkilöt palvelimelta
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // päivittää nimen kirjoitettaessa
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // päivittää numeron kirjoitettaessa
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // lisää uuden henkilön
  const addPerson = (event) => {
    event.preventDefault()

    // tarkistetaan löytyykö nimi jo
    const existingPerson = persons.find(
      person => person.name.toLowerCase().trim() ===
        newName.toLowerCase().trim()
    )

    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName.trim(),
      number: newNumber
    }

    // lisätään henkilö palvelimelle
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        alert(error.response?.data?.error || 'Adding person failed')
      })
  }

  // poistaa henkilön
  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
