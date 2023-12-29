import React from 'react';


const KeyboardLayout = ({ keyColors }) => {


  const handleClick = (key) => {
    window.alert("use keyboard")

  };



  const renderKey = (key) => (

    key === 'enter'
      ? (
        <button className='enter'
          key={key}
          onClick={handleClick}
        >
          {key === 'enter' ? '⏎' : key.toUpperCase()}
        </button>
      )
      : (
        <div className={'key ' + keyColors[key]}
          key={key}
        >
          {key === 'enter' ? '⏎' : key.toUpperCase()}
        </div>
      )
  );


  const alphabet = 'qwertyuiopasdfghjklzxcvbnm'.split('');



  const row1 = Array.from({ length: 10 - 0 + 1 }, (_, index) => index);
  return (
    <div className='keyboard'>
      <div className='key-row'>
        {alphabet.map((letter, index) => {
          if (index < 10) {
            return renderKey(letter);
          }
          return null; // or an empty fragment: <React.Fragment key={index}></React.Fragment>
        })}
      </div>
      <div className='key-row'>
        {alphabet.map((letter, index) => {
          if (index > 9 && index < 19) {
            return renderKey(letter);
          }
          return null; // or an empty fragment: <React.Fragment key={index}></React.Fragment>
        })}
      </div>
      <div className='key-row'>
        {alphabet.map((letter, index) => {
          if (index > 18) {
            return renderKey(letter);
          }
          return null; // or an empty fragment: <React.Fragment key={index}></React.Fragment>
        })}
        {renderKey('enter')}

      </div>

    </div>
  );
};

export default KeyboardLayout;