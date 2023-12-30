import { useState } from 'react';

const Row = ({ word, color }) => {
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

  const handleDivTouch = () => {
    // Open the keyboard by setting isKeyboardOpen to true
    setKeyboardOpen(true);
  };

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

            < div key={idx} className={`cell ${color[idx]}`} onTouchStart={handleDivTouch} > {letter ? letter : space}
              {isKeyboardOpen && (
                <input
                  type="text"
                  style={{ position: 'absolute', top: '-100px' }} // Move the input off-screen
                  onBlur={() => setKeyboardOpen(false)} // Close the keyboard when the input loses focus
                />
              )}
            </div>
          )
        })
      }
    </div >
  )
}

export default Row;