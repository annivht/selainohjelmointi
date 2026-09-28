import { useState } from 'react' 
//käytetään reactin valmista funktiota useState, 
//jolla voidaan luoda komponentin tilaa

const App = () => { //luodaan App niminen react komponentti
  const anecdotes = [ //taulukko, jossa on anekdootteja
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0) //luodaan state selected+setselected, alussa nolla
  //Luodaan kahdeksanpaikkainen taulukko Array(anecdotes.length), .fill(0) täyttää kaikki paikat nollilla,
  //asetetaan stateen votes+setVotes(päivittää taulukon), alussa nollaäänet kaikilla anekdooteilla
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  //suoritetaan kun next anecdote painetaan, luodaan satunnainen numero 0-7, asetetaan selected stateen
  const randomAnecdote = () => {
    //random desimaaliluku, pyöristetään alaspäin kokonaisluvuksi, kerrotaan anekdoottien määrällä, saadaan satunnainen indeksi
    const random = Math.floor(Math.random() * anecdotes.length)
    //vaihdetaan arvottuun numeroon
    setSelected(random)
  }
  //luodaan vote funktio(kun käyttäjä painaa vote)
  const vote = () => {
    const copy = [...votes] //joka kopioi votes taulukon,
    copy[selected] += 1 ////lisää valitun anekdootin ääniä yhdellä,
    setVotes(copy) //ja taulukko tallennetaan stateen
  }

  const maxVotes = Math.max(...votes) //etsii suurimman luvun votes-taulukosta
  const mostVotes = votes.indexOf(maxVotes) //etsii suurimman luvun indeksin votes-taulukosta, eli anekdootin, jolla on eniten ääniä

  return (
    <div>
      <h1>Anecdote of the day</h1>

      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p> 

      <button onClick={vote}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>

      <p>{anecdotes[mostVotes]}</p>
      <p>has {votes[mostVotes]} votes</p> 
    </div>
  )
}

export default App
