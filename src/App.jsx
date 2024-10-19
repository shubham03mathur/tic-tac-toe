import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
    const [activePlayer, setActivePlayer] = useState("X");
    const [gameTurn, setGameTurn] = useState([]);

    const onSelectGameTurn = (rowIndex, colIndex) => {
        setActivePlayer((prevActivePlayer) =>
            prevActivePlayer === "X" ? "0" : "X"
        );

        setGameTurn((prevGameTurn) => {
            let currentPlayer = "X";

            if (prevGameTurn?.[0]?.player === "X") {
                currentPlayer = "0";
            }
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
                <img src="" alt="" />
            </header>
            <main>
                <div id="game-container">
                    <ol id="players" className="highlight-player">
                        <Player
                            playerName="Player 1"
                            symbol="X"
                            isActive={activePlayer === "X"}
                        />
                        <Player
                            playerName="Player 2"
                            symbol="0"
                            isActive={activePlayer === "0"}
                        />
                    </ol>
                    <GameBoard
                        turns={gameTurn}
                        onSelectGameTurn={onSelectGameTurn}
                    />
                </div>
                LOGS
            </main>
        </>
    );
}

export default App;
