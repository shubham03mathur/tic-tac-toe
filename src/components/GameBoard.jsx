/* eslint-disable react/prop-types */

const GameBoard = ({ board, onSelectGameTurn }) => {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        {
                            <ol>
                                {row.map((playerSymbol, colIndex) => (
                                    <li key={colIndex}>
                                        <button
                                            disabled={playerSymbol !== null}
                                            onClick={() =>
                                                onSelectGameTurn(
                                                    rowIndex,
                                                    colIndex
                                                )
                                            }
                                        >
                                            {playerSymbol}
                                        </button>
                                    </li>
                                ))}
                            </ol>
                        }
                    </li>
                );
            })}
        </ol>
    );
};

export default GameBoard;
