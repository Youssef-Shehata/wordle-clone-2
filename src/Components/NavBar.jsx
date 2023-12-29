import React, { useState, useEffect, useRef } from 'react';
import { FaCog, FaQuestionCircle } from 'react-icons/fa';


const word1 = process.env.PUBLIC_URL + '/icons/firstword.png'
const word2 = process.env.PUBLIC_URL + '/icons/secondword.png'
const word3 = process.env.PUBLIC_URL + '/icons/thirdword.png'

// client/public/icons/thirdword.png
const NavBar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsMenuRef = useRef(null);

  const helpMenuRef = useRef(null);

  const settingsIconWrapperRef = useRef(null);
  const helpIconWrapperRef = useRef(null);

  const [helpMenu, setHelpMenu] = useState(false)


  const Help = () => {

    return (
      // <div className='howtoplay' >

      <>
        <h1>How To Play</h1>

        <h2>Guess the Wordle in 6 tries.</h2>
        <ul>
          <li>Each guess must be a valid 5-letter word.</li>
          <li>The color of the tiles will change to show how close your guess was to the word.</li>
        </ul>
        <h3>Examples</h3>
        <p>W is in the word and in the correct spot.</p>
        <img src={word1} alt='oi'></img>
        <p>I is in the word but in the wrong spot.</p>
        <img src={word2}  ></img>
        <p>U is not in the word in any spot.</p>
        <img src={word3}></img>


      </>

      // </div>



    )

  }



  const toggleHelpMenu = () => {
    setHelpMenu((prevOpen) => !prevOpen);

  }

  const toggleDarkTheme = () => {
    window.alert('no');
  };

  const toggleSettingsMenu = () => {
    setIsSettingsOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        settingsIconWrapperRef.current &&
        !settingsIconWrapperRef.current.contains(e.target) &&
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(e.target)
      ) {
        setIsSettingsOpen(false);

      }


      if (
        helpIconWrapperRef.current &&
        !helpIconWrapperRef.current.contains(e.target) &&
        helpMenuRef.current &&
        !helpMenuRef.current.contains(e.target)
      ) {
        setHelpMenu(false);

      }

    };

    // Attach the event listener when the component mounts
    window.addEventListener('click', handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);






  return (
    <div className="navbar">
      <div className="navbar-title">WORDLE</div>
      <div className="navbar-icons">
        <div ref={settingsIconWrapperRef}>
          <FaCog onClick={toggleSettingsMenu} className="icon" />
        </div>
        <div ref={helpIconWrapperRef}>
          <FaQuestionCircle className="icon" onClick={toggleHelpMenu} />

        </div>
      </div>
      {helpMenu && (
        <div ref={helpMenuRef} className='howtoplay'>
          <Help />

        </div>


      )
      }
      {isSettingsOpen && (
        <div ref={settingsMenuRef} className={`settings-menu ${isSettingsOpen ? 'active' : ''}`}>
          <div >Dark Theme:</div>
          <div className="setting" onClick={toggleDarkTheme}>
            ON
          </div>
        </div>
      )}


    </div>
  );
};

export default NavBar;
