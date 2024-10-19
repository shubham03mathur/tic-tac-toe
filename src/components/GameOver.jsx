/* eslint-disable react/prop-types */
const GameOver = ({ winner, onRematch }) => {
  return (
    <div id="game-over">
        <h2>Game Over!</h2>
        <p>{ winner ? `You won ${winner}!` : "It's a draw!"}</p>
        <button onClick={onRematch} >Rematch!</button>
    </div>
  )
}

export default GameOver;