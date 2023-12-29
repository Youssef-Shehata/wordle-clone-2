import { useEffect, useState } from 'react';
import './App.css';
import words from './words.json';
import NavBar from './Components/NavBar';
import KeyboardLayout from './Components/KeyboardLayout';


const colorLetter = (word, solution) => {
  if (word === null) return {}

  let solArr = solution.split('')
  word = word.split('')

  const colors = Array(5).fill("")
  const hist = {}

  word.map((letter, idx) => {
    if (solArr[idx] === letter) {
      colors[idx] = 'green'
      hist[letter] = 'green'
    }
    else if (solArr.indexOf(letter) !== -1 && hist[letter] !== 'green') {
      colors[idx] = 'orange'
      hist[letter] = 'orange'
    }
    else {
      colors[idx] = 'gray'
      hist[letter] = 'gray'
    }
  })
  return colors
}


const coloring = (attempts, solution) => {
  let newKeyHist = {}
  let solArr = solution.split('')
  for (let attempt of attempts) {
    if (attempt === null) break
    let word = attempt.split('')
    word.map((letter, idx) => {
      if (solArr[idx] === letter) newKeyHist[letter] = 'green'
      else if (solArr.indexOf(letter) !== -1 && newKeyHist[letter] !== 'green') newKeyHist[letter] = 'orange'
      else if (newKeyHist[letter] !== 'green') newKeyHist[letter] = 'gray'
    })
  }
  return newKeyHist
}

const Row = ({ word, color }) => {
  let splittedWord = ''
  if (word === '' || word === null) {
    splittedWord = ['', '', '', '', '']
  } else {
    splittedWord = word.split('')
  }
  return (
    <div className='row'>
      {
        Array(5).fill(' ').map((space, idx) => {
          let letter = splittedWord[idx]
          return (
            < div key={idx} className={`cell ${color[idx]}`} > {letter ? letter : space} </div>
          )
        })
      }
    </div >
  )
}

function App() {
  const [solution, setSolution] = useState('')
  const [attempts, setAttempts] = useState(Array(6).fill(null))
  const [current, setCurrent] = useState("")
  const [keyHist, setKeyHist] = useState({})
  const [colors, setColors] = useState(Array(6).fill(Array(5)))

  useEffect(() => {
    const updateSolution = () => {
      setSolution(words[Math.floor(Math.random() * words.length)])
    }
    updateSolution()
  }, [])



  useEffect(() => {

    const newKeyHist = coloring(attempts, solution)
    setKeyHist(newKeyHist)
  }, [attempts])

  const handleSubmit = () => {
    if (current.length !== 5) return
    // if (words.indexOf(current) === -1) return

    let index = attempts.findIndex((guess) => guess === null)
    let newAttempts = [...attempts]
    newAttempts[index] = current
    colors[index] = colorLetter(current, solution)
    setAttempts(newAttempts)
    setCurrent('')
  }


  useEffect(() => {
    const handleKey = (e) => {

      let key = e.key
      // if (locked || won) return;
      if (key === 'Backspace') {
        setCurrent(prevWord => prevWord.slice(0, -1));
      }
      if (key === 'Enter') {
        handleSubmit()

      }

      if (/[a-zA-Z]/.test(key) && key.length === 1 && current.length < 5) {
        key = key.toLowerCase()
        setCurrent(old => old + key);
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [current])



  return (
    <div className="App">
      <NavBar />
      <div className='grid'>
        {solution}
        {attempts.map((attempt, idx) => {
          const isCurrent = idx === attempts.findIndex((guess) => guess === null)
          return (<Row key={idx} word={isCurrent ? current : attempt} color={colors[idx]} />)

        })}
      </div>
      <KeyboardLayout keyColors={keyHist} />
    </div>
  );
}

export default App;
