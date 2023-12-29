
const PopUp = ({ onPlayAgain, won, solution }) => {
  if (won) return (
    <div className="popup">
      <div className="popup-content">
        <p>You Won!</p>
        <button className='playagain' onClick={onPlayAgain}>Play Again</button>
      </div>
    </div>
  );
  else {


    return (
      <div className="popup">
        <div className="popup-content">
          <p>You LOST!</p>
          <p>Word Is <span style={{ color: "green" }}>{solution.toUpperCase()}  </span></p>

          <button className='playagain' onClick={onPlayAgain}>Play Again</button>
        </div>
      </div>
    );

  }


};

export default PopUp;