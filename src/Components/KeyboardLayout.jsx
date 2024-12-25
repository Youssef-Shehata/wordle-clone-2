import React from 'react';
function simulateKeyPress(char) {
    let keyCode;
    let key;
    let code;
    switch (char) {
        case 'enter':
            keyCode = 13; // Enter key code
            key = 'Enter';
            code = 'Enter';
            break;
        case 'backspace':
            keyCode = 8; // Backspace key code
            key = 'Backspace';
            code = 'Backspace';
            break;
        default:
            keyCode = char.toUpperCase().charCodeAt(0);
            key = char;
            code = `Key${char.toUpperCase()}`;
            break;
    }

    const eventInit = {
        key: char,
        code: `Key${char.toUpperCase()}`,
        keyCode: keyCode,
        which: keyCode,
        bubbles: true,
        cancelable: true
    };

    // Create and dispatch the keydown event
    const keydownEvent = new KeyboardEvent('keydown', eventInit);
    document.dispatchEvent(keydownEvent);
    // Create and dispatch the keypress event
    if (char.length === 1) {
        const keypressEvent = new KeyboardEvent('keypress', eventInit);
        document.dispatchEvent(keypressEvent);
    }

    // Create and dispatch the keyup event
    const keyupEvent = new KeyboardEvent('keyup', eventInit);
    document.dispatchEvent(keyupEvent);
}
const KeyboardLayout = ({ keyColors }) => {


    const handleClick = (key) => {
        return () => {
            simulateKeyPress(key)
        }
    };



    const getKeyLabel = (key) => {
        switch (key) {
            case 'backspace':
                return '<';
            case 'enter':
                return '⏎';
            default:
                return key.toUpperCase();
        }
    };
    const renderKey = (key) => (


        key === 'enter' || key === 'backspace' ? (
            <button className='enter' key={key} onClick={handleClick(key)}>
                {getKeyLabel(key)}
            </button>
        ) : (
            <div className={'key ' + keyColors[key]} key={key} onClick={handleClick(key)}>
                {key.toUpperCase()}
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

                {renderKey('backspace')}
                {renderKey('enter')}

            </div>

        </div>
    );
};

export default KeyboardLayout;
