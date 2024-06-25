import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from '../auth/AuthContext';
import API_URL from "../config";

export default function APIHandler({ endpoint, method, setDataArr, params }){
  const { token } = useContext(AuthContext);

  const fetchRequest = async function ( url, method , body) {
    try {
      if (method === "GET") {
          const res = await axios({
            method: 'get',
            url: url,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = res.data;
          return JSON.stringify(data);
      } else {
          const res = await axios({
            method: 'patch',
            url: url,
            headers: {
              'Authorization': `Bearer ${token}`
            },
            data: body
          });
          const data = res.data;
          return JSON.stringify(data);
      }
    } catch (error) {
        console.error(error);  
    }
  }


  const getInfo = async function () {
    let data = await fetchRequest(`${API_URL}/game/${params.gamesession}/${endpoint}`, method, {});
    setDataArr[0](data);
    data = JSON.parse(data);
    let CurrentPlayer = data.board.players.find(player => player.playerNumber === data.current_player);
    setDataArr[1]([data.turn, data.current_player, CurrentPlayer.name, CurrentPlayer.id]);
    setDataArr[2](data.board.players);
  }

  const patchRequest = async function () {
    const data = await fetchRequest(`${API_URL}/game/${params.gamesession}/${endpoint}/${params.playerid}`, method, params.body);
    setDataArr[0](data);
    if (endpoint === 'throw_dice') {
      let dataObj = JSON.parse(data);
      let board = JSON.parse(dataObj.board);
      setDataArr[1](board);
      setDataArr[2](board.players);
    }
  }


  const patchThrowBomb = async function () {
    let body = {target_id: params.target_id};
    const data = await fetchRequest(`${API_URL}/game/${params.gamesession}/${endpoint}/${params.playerid}`, method, body);
    setDataArr[0](data);
  }

  const patchDefuseBomb = async function (e, defuseState) {
    let body = {defuse: defuseState};
    let playerWithBomb = params.playerWithBomb;
    console.log(`${API_URL}/game/${params.gamesession}/${endpoint}/${playerWithBomb}`, method, body)
    const data = await fetchRequest(`${API_URL}/game/${params.gamesession}/${endpoint}/${playerWithBomb}`, method, body);
    setDataArr[0](data);
    let dataObj = JSON.parse(data);
    let board = JSON.parse(dataObj.board);
    setDataArr[1](board);
    setDataArr[2](board.players);
  }

  const patchStore = async function () {
    let body = {selectedOption: params.selectedOption};
    const data = await fetchRequest(`${API_URL}/game/${params.gamesession}/${endpoint}/${params.playerid}`, method, body);
    setDataArr[0](data);
  }


  const handlerDefuseChange = function (e) {
    setDefuse(e.target.value);
  }

  const handlerPlayerWithBombChange = function (e) {
    setPlayerWithBomb(e.target.value);
  }

  const handlerStoreChange = function (e) {
    setStoreOption(e.target.value);
  }

  if (endpoint === 'info') {
    return (
      <div>
        <button onClick={getInfo}>GET info</button>
      </div>
    )
  }
  else if (endpoint === 'end_turn'){
    return (
      <div>
        <button onClick={patchRequest}>Terminar Turno</button>
      </div>
    )
  }
  else if (endpoint === 'throw_bomb'){
    return (
      <div>
        <button onClick={() => {
              patchThrowBomb();
              setDataArr[setDataArr.length - 1](false);
         }} className='button'>
            Lanzar bomba
        </button>
      </div>
    )
  }
  else if (endpoint === 'throw_dice'){
    return (
      <div>
        <button onClick={patchRequest}>Lanzar dado</button>
      </div>
    )
  }
  else if (endpoint === 'defuse_bomb'){
    return (
      <div>
        <button onClick={
          (e) => {
            patchDefuseBomb(e, true);
            setDataArr[setDataArr.length - 1](false);
         }
        }>Desactivar</button>
        <button onClick={
          (e) => {
            patchDefuseBomb(e, false);
            setDataArr[setDataArr.length - 1](false);
         }
        }>No desactivar</button>
      </div>
    )
  }
  else if (endpoint === 'store'){
    return (
      <div>
        <button onClick={patchStore}>Comprar</button>
      </div>
    )
  }
}
