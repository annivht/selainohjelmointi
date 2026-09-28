// Tehtävät 2.18 ja 2.19 tehty.

import { useState, useEffect } from 'react'
import axios from 'axios'


// yhden maan tiedot
const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <h2>languages:</h2>

      {/* muutetaan kielet taulukoksi ja näytetään ne listana */}
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>

      {/* maan lippu */}
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        width="150"
      />
    </div>
  )
}


// päättää mitä hakutuloksista näytetään
const Countries = ({ countries, showCountry }) => {

  // jos maita löytyy yli 10
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  // jos maita löytyy 2-10, näytetään nimet ja show-napit
  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country =>
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => showCountry(country)}>
              show
            </button>
          </p>
        )}
      </div>
    )
  }

  // jos löytyy vain yksi maa, näytetään tiedot
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  // jos yhtään maata ei löydy
  return <p>No matches</p>
}


const App = () => {

  // kaikki API:sta haetut maat
  const [countries, setCountries] = useState([])

  // hakukentän teksti
  const [search, setSearch] = useState('')


  // haetaan maat API:sta kun sivu avataan
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  // päivittää hakukentän tekstin
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }


  // show-napista laitetaan maan nimi hakukenttään
  const showCountry = (country) => {
    setSearch(country.name.common)
  }


  // suodatetaan maat hakukentän perusteella
  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div>

      {/* hakukenttä */}
      <div>
        find countries
        <input
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* näytetään haun tulokset */}
      <Countries
        countries={countriesToShow}
        showCountry={showCountry}
      />

    </div>
  )
}

export default App