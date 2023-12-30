import { useEffect, useState } from 'react';
import './App.css';
import words from './words.json';
import NavBar from './Components/NavBar';
import KeyboardLayout from './Components/KeyboardLayout';
import PopUp from './Components/PopUp';
import InvalidWordo from './Components/InvalidWordo';
import Row from './Components/Row';


const colorLetter = (word, solution) => {
  if (word === null) return {}
  let solArr = solution.split('')
  word = word.split('')

  // word :  N E E L E
  //sol   :  T H R E E 



  const colors = Array(5).fill("")
  const hist = {}
  const accurs = {}

  solArr.map(letter => {
    if (accurs[letter]) accurs[letter] = accurs[letter] + 1
    else accurs[letter] = 1
  })


  word.map((letter, idx) => {
    if (solArr[idx] === letter) {
      colors[idx] = 'green'
      hist[letter] = 'green'
      accurs[letter] = accurs[letter] - 1
    }
    return letter
  })



  word.map((letter, idx) => {
    if (solArr[idx] === letter) {
      return letter
    }

    else if (solArr.indexOf(letter) !== -1) {

      if (accurs[letter] > 0) {
        colors[idx] = 'orange'
        accurs[letter] = accurs[letter] - 1

      }
    }
    else {
      colors[idx] = 'gray'
      hist[letter] = 'gray'
    }


    return letter
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
      return letter
    })
  }
  return newKeyHist
}


function App() {
  const [solution, setSolution] = useState('')
  const [attempts, setAttempts] = useState(Array(6).fill(null))
  const [current, setCurrent] = useState("")
  const [keyHist, setKeyHist] = useState({})
  const [colors, setColors] = useState(Array(6).fill(Array(5)))
  const [won, setWon] = useState(false)
  const [popo, setpopo] = useState(false)
  const [invalid, setInvalid] = useState(false)

  const handlePlayAgain = () => {
    updateSolution()
    setAttempts(Array(6).fill(null))
    setCurrent('')
    setKeyHist({})
    setColors(Array(6).fill(Array(5)))
    setWon(false)
    setpopo(false)

  }

  const updateSolution = () => {
    setSolution(words[Math.floor(Math.random() * words.length)].toLowerCase())
    // setSolution('')

  }


  //set a targeet on render
  useEffect(() => {
    updateSolution()
  }, [])



  //everytime user enters a new geuss update key colors and check if he won 
  useEffect(() => {
    const newKeyHist = coloring(attempts, solution)
    setKeyHist(newKeyHist)

    const calcGame = () => {
      if (attempts.indexOf(null) === -1) {
        if (attempts[5] === solution) {
          setWon(true)
          setpopo(true)

        } else {
          setpopo(true)
        }
      } else if (attempts[attempts.indexOf(null) - 1] === solution) {
        setWon(true)
        setpopo(true)
      }
    }
    calcGame()
  }, [attempts, solution])


  //handle submitting a geuss
  const handleSubmit = () => {
    if (current.length !== 5) return
    if (words.indexOf(current) === -1) {
      setInvalid(true)
      setTimeout(() => {
        setInvalid(false)

      }, 500)
      return
    }

    //update states if the geuss is valid
    let index = attempts.findIndex((guess) => guess === null)
    let newAttempts = [...attempts]
    let newColors = [...colors]
    newAttempts[index] = current
    newColors[index] = colorLetter(current, solution)

    setAttempts(newAttempts)
    setColors(newColors)
    setCurrent('')


  }


  //set listeners for keystrokes 
  //has to be an english ketter ,backspace or enter 
  useEffect(() => {
    const handleKey = (e) => {

      let key = e.key
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
      <div className='grid' >
        {popo && <PopUp onPlayAgain={handlePlayAgain} won={won} solution={solution} />}
        {invalid && <InvalidWordo />}
        {/* {solution} */}
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
