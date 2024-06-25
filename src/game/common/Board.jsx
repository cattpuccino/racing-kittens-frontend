import React, { useState, useEffect } from 'react';
import '../../styles/game.css';
import player1Icon from '/Player1.png';
import player2Icon from '/Player2.png';
import player3Icon from '/Player3.png';
import player4Icon from '/Player4.png';
import maldicion from '/maldicion.png';
import fortuna from '/fortuna.png';
import tienda from '/tienda.png';


const playerIcons = {
  1: player1Icon,
  2: player2Icon,
  3: player3Icon,
  4: player4Icon
};

export default function Board({initBoard}) {
  const [players, setPlayers] = useState([]);
  const [board, setBoard] = useState({size: 0, specialCells: []});

  useEffect(() => {
    setPlayers(initBoard.players);
    setBoard(initBoard);
  }, [initBoard]);

  const getCellColor = (cellIndex) => { 
    const row = Math.floor(cellIndex / 6);
    const isEvenRow = row % 2 === 0;
    const isEvenCell = cellIndex % 2 === 0;
    const color = isEvenRow 
      ? (isEvenCell ? '#FF732C' : 'white') 
      : (isEvenCell ? 'white' : '#FF732C');
    return { backgroundColor: color };
  };

  const getPosition = (index) => {
    const row = Math.floor(index / 6);
    const isEvenRow = row % 2 === 0;
    if (isEvenRow) {
      return index;
    } else {
      const rowStart = row * 6;
      const rowEnd = rowStart + 5;
      return rowEnd - (index - rowStart);
    }
  };

  const renderCell = (index) => {
    const position = getPosition(index);
    const player = players.find(player => player.position === position + 1); // index + 1 porque el tablero empieza en 1
    if (player) { // Si hay un jugador en la celda
      return (
        <div className="playerPiece">
          <img src={playerIcons[player.playerNumber]} alt={`player-piece-icon-${player.playerNumber}`} className="piece-icon" />
        </div>
      );
    }

    if (board) { // Si hay un tablero
      const specialCell = board.specialCells.find(cell => cell.position === position + 1);
      if (specialCell) { 
        switch (specialCell.type) {
          case 'curse':
            return <div><img src={maldicion} alt="maldicion" className='board-icon'/></div>; // Cambiar por el icono de maldicion
          case 'fortune':
            return <div><img src={fortuna} alt="fortuna" className='board-icon'/></div>; // Cambiar por el icono de fortuna
          case 'store':
            return <div><img src={tienda} alt="tienda" className='board-icon'/></div>; // Cambiar por el icono de tienda
          default:
            return null;
        }
      }
    }
  };

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board">
      {
        Array.from({ length: board.size }).map((_, index) => (
            <div key={index} className="cell" style={getCellColor(index)}>
                {renderCell(index)}
            </div>
        ))
      }
    </div>
  );
}



