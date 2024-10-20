import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./utils/winning-combinations";

const INITIAL_GAMEBOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const PLAYERS = {
    X: "Player 1",
    O: "Player 2",
};

const getDerivedActivePlayer = (gameTurn) => {
    let currentPlayer = "X";

    if (gameTurn?.[0]?.player === "X") {
        currentPlayer = "O";
    }

    return currentPlayer;
};

const deriveWinner = (gameBoard, players) => {
    let winner;
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
            winner = players[firstSquareSymbol];
        }
    }

    return winner;
};
function App() {
    const [gameTurn, setGameTurn] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);

    const activePlayer = getDerivedActivePlayer(gameTurn);
    let gameBoard = [...INITIAL_GAMEBOARD.map((array) => [...array])];
    for (const turn of gameTurn) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    const winner = deriveWinner(gameBoard, players);

    const isDraw = gameTurn.length === 9 && !winner;

    const onRematch = () => {
        setGameTurn([]);
    };

    const handlePlayerNameChange = (symbol, playerName) => {
        setPlayers((prevPlayerNames) => {
            return {
                ...prevPlayerNames,
                [symbol]: playerName,
            };
        });
    };

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
                <h1 style={{ marginBottom: "5px" }}>Tic-Tac-Toe</h1>
                <center>
                    <small>
                        <span style={{ color: "#3f3b00" }}>Made with</span> ❤️{" "}
                        <span style={{ color: "#3f3b00" }}>
                            by{" "}
                            <a
                                target="_blank"
                                href="https://www.linkedin.com/in/shubham-mathur-88502657/"
                            >
                                Shubham
                            </a>
                        </span>
                    </small>
                </center>
            </header>
            <div className="main-container">
                <div className="game-board-container">
                    <main>
                        <div id="game-container">
                            <ol id="players" className="highlight-player">
                                <Player
                                    playerName={PLAYERS.X}
                                    symbol="X"
                                    handleNameChange={handlePlayerNameChange}
                                    isActive={activePlayer === "X"}
                                />
                                <Player
                                    playerName={PLAYERS.O}
                                    symbol="O"
                                    handleNameChange={handlePlayerNameChange}
                                    isActive={activePlayer === "O"}
                                />
                            </ol>
                            {(winner || isDraw) && (
                                <GameOver
                                    winner={winner}
                                    onRematch={onRematch}
                                />
                            )}
                            <GameBoard
                                board={gameBoard}
                                onSelectGameTurn={onSelectGameTurn}
                            />
                        </div>
                    </main>
                </div>
                <div className="log-container">
                    <Log turns={gameTurn} />
                </div>
            </div>
        </>
    );
}

export default App;
