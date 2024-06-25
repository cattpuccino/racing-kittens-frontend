import '../styles/game.css'
import { useEffect, useState, useContext } from 'react'
import Player from './common/Player';
import Board from './common/Board';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import Dice from './common/Dice';
import Bomb from './common/Bomb';
import Store from './common/Store';
import Explode from './common/Explode';
import GetBomb from './common/GetBomb';
import Disconnect from './common/Disconnect';
import Winner from './common/Winner';
import EndTurn from './common/EndTurn';
import MessageBox from './common/MessageBox';
import API_URL from '../config';

export default function GamePage() {
    const { userName } = useContext(AuthContext);
    const [players, setPlayers] = useState([]);
    const { token } = useContext(AuthContext)
    const [board, setBoard] = useState({ size: 0, specialCells: [], players: [] });
    const [turnPlayer, setTurnPlayer] = useState([0, 1, "Jugador 1"]);
    const [APIresponse, setAPIresponse] = useState('{"message": "Playing game"}');
    const [playerNumber, setPlayerNumber] = useState([0,0]);
    const queryParameters = new URLSearchParams(window.location.search)
    const gamesession_id = queryParameters.get("gameid")
    
    useEffect(() => {
      axios({
        method: 'get',
        url: `${API_URL}/game/${gamesession_id}/info`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          setAPIresponse(JSON.stringify(res.data));
          let dataPlayers = res.data.board.players;
          setPlayers(dataPlayers);
          let dataBoard = res.data.board;
          setBoard(dataBoard);
          let CurrentPlayer = dataPlayers.find(player => player.playerNumber === res.data.current_player);
          let player = dataPlayers.find(player => player.name === userName);
          setTurnPlayer([res.data.turn, CurrentPlayer.playerNumber, CurrentPlayer.name, CurrentPlayer.id]);
          setPlayerNumber([player.id, player.playerNumber]);
        })
        .catch((error) => console.error(error));
      
    }, [])

    return (
        <div id='temp'>
          <div id='game-page'>
            <div className='column' id='left-column'>
              <div className='player-info'>
              {players.length > 0 && players !== undefined && (
                  <>
                    <Player id={1} name={players[0].name} color={players[0].color} coins={players[0].coins} defusers={players[0].defusers} bomb={players[0].bomb}/>
                    <Player id={2} name={players[1].name} color={players[1].color} coins={players[1].coins} defusers={players[1].defusers} bomb={players[1].bomb}/>
                  </>
                )}
              </div>
            </div>
            <div className='column' id='center-column'>
              <h2 id='turn-info'>Turno: {turnPlayer[0]} - Jugador: {turnPlayer[2]}</h2>
              <MessageBox params={{body: APIresponse}} />
              <Board initBoard={board}/>
              <div className='button-area'>
              <Bomb setDataArr={[setAPIresponse]} params={{gamesession:gamesession_id, playerid: playerNumber[0], body: APIresponse, playerNumber:playerNumber[1]}} />
              <Dice setDataArr={[setAPIresponse, setBoard, setPlayers]} params={{ gamesession: gamesession_id, playerid: playerNumber[0], body: JSON.parse(APIresponse) }} />
              <Store setDataArr={[setAPIresponse]} params={{gamesession:gamesession_id, playerid: playerNumber[0], body: APIresponse}} />
              <EndTurn setDataArr={[setAPIresponse]} params={{gamesession:gamesession_id, playerid: playerNumber[0], body: {}}}/>
              <Explode setDataArr={[setAPIresponse]} params={{gamesession:gamesession_id, playerid: playerNumber[0], body: APIresponse}} />
              <GetBomb setDataArr={[setAPIresponse, setBoard, setPlayers]} params={{gamesession:gamesession_id, playerid: playerNumber[0], body: APIresponse, board:board}} />
              <Disconnect />
              <Winner setDataArr={[setAPIresponse]} params={{gamesession:gamesession_id, playerid: playerNumber[0], body: APIresponse}} />
              </div>
            </div>
            <div className='column' id='right-column'>
              <div className='player-info'>
              {players.length > 0 && players !== undefined && (
                  <>
                    <Player id={3} name={players[2].name} color={players[2].color} coins={players[2].coins} defusers={players[2].defusers} bomb={players[2].bomb}/>
                    <Player id={4} name={players[3].name} color={players[3].color} coins={players[3].coins} defusers={players[3].defusers} bomb={players[3].bomb}/>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
    )
}