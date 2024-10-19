/* eslint-disable react/prop-types */
const initialGameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const GameBoard = ({ turns, onSelectGameTurn }) => {
    let gameBoard = initialGameboard;

    for (const turn of turns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        {
                            <ol>
                                {row.map((playerSymbol, colIndex) => (
                                    <li key={colIndex}>
                                        <button
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
