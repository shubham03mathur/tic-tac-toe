import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./utils/winning-combinations";

const initialGameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const getDerivedActivePlayer = (gameTurn) => {
    let currentPlayer = "X";

    if (gameTurn?.[0]?.player === "X") {
        currentPlayer = "O";
    }

    return currentPlayer;
};

function App() {
    const [gameTurn, setGameTurn] = useState([]);
    const [playerNames, setPlayerNames] = useState({
        X: "Player 1",
        O: "Player 2"
    })

    const activePlayer = getDerivedActivePlayer(gameTurn);
    let gameBoard = [...initialGameboard.map(array => [...array])];
    let winner;

    for (const turn of gameTurn) {
        const { square, player } = turn;
        const { row, col } = square;
        
        gameBoard[row][col] = player;
    }

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column];

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = playerNames[firstSquareSymbol];
        }
    }

    const isDraw = gameTurn.length === 9 && !winner;

    const onRematch = () => {
        setGameTurn([]);
    }

    const handlePlayerNameChange = (symbol, playerName) => {
        setPlayerNames(prevPlayerNames => {
            return {
                ...prevPlayerNames,
                [symbol]: playerName
            }
        });
    }

    const onSelectGameTurn = (rowIndex, colIndex) => {
        setGameTurn((prevGameTurn) => {
            const currentPlayer = getDerivedActivePlayer(prevGameTurn);
            const updatedGameTurn = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prevGameTurn,
            ];
            return updatedGameTurn;
        });
    };
    return (
        <>
            <header>
                <img src="game-logo.png" alt="logo" />
                <h1>Tic-Tac-Toe</h1>
            </header>
            <div>
                <main>
                    <div id="game-container">
                        <ol id="players" className="highlight-player">
                            <Player
                                playerName={playerNames.X}
                                symbol="X"
                                handleNameChange={handlePlayerNameChange}
                                isActive={activePlayer === "X"}
                            />
                            <Player
                                playerName={playerNames.O}
                                symbol="O"
                                handleNameChange={handlePlayerNameChange}
                                isActive={activePlayer === "O"}
                            />
                        </ol>
                        {(winner || isDraw) && <GameOver winner={winner} onRematch={onRematch}/>}
                        <GameBoard
                            board={gameBoard}
                            onSelectGameTurn={onSelectGameTurn}
                        />
                    </div>
                </main>
            </div>
            <Log turns={gameTurn} />
        </>
    );
}

export default App;
