/* eslint-disable react/prop-types */
import { useState } from "react";

function Player({ playerName, symbol, isActive }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableName, setEditableName] = useState(playerName);

    const toggleEditing = () => {
        setIsEditing((prevState) => !prevState);
    };

    const handleChange = (event) => {
        setEditableName(event.target.value);
    };

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {!isEditing ? (
                    <span className="player-name">{editableName}</span>
                ) : (
                    <input
                        required
                        value={editableName}
                        onChange={handleChange}
                    />
                )}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={toggleEditing}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}

export default Player;
