import { useState } from 'react'

const Button = (props) => {
  //nappia painettaessa suoritetaan handleClick ja napissa näytetään text
  return <button onClick={props.handleClick}>{props.text}</button>
}
// komponentti tekee yhden rivin tilastotaulukkoon
const TilastoTaulukko = (props) => {
  return (
    //tr = table row, td = table data taulukon solu
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
//laskee ja näyttää tilastot, jos palautetta on annettu, muuten ilmoittaa ettei palautetta ole annettu
const Tilasto = (props) => {
  // lasketaan kaikkien annettujen palautteiden määrä
  const all = props.good + props.neutral + props.bad

  if (all === 0) {
    return <p>No feedback given</p>
  }
  // lasketaan palautteiden keskiarvo (good +1, neutral 0, bad -1)
  const average = (props.good - props.bad) / all
  // lasketaan positiivisten palautteiden prosenttiosuus
  const positive = (props.good / all) * 100
  //näytetään tilastot taulukossa
  return (
    <table>
      <tbody>
        //käytetään TilastoTaulukko komponenttia jokaiselle tilastolle
        <TilastoTaulukko text="good" value={props.good} />
        <TilastoTaulukko text="neutral" value={props.neutral} />
        <TilastoTaulukko text="bad" value={props.bad} />
        <TilastoTaulukko text="all" value={all} />
        <TilastoTaulukko text="average" value={average} />
        <TilastoTaulukko text="positive" value={positive + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // good-palautteiden määrä, alkuarvo 0
  const [good, setGood] = useState(0)
  // neutral-palautteiden määrä, alkuarvo 0
  const [neutral, setNeutral] = useState(0)
  // bad-palautteiden määrä, alkuarvo 0
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      //kun nappia painetaan, suorita funktio, joka kasvattaa good-statea yhdellä
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      //App antaa Tilasto-komponentille kolme propsia
      <Tilasto good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App