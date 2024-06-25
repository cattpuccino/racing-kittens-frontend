import '../../styles/game.css';
import player1Icon from '/Player1.png';
import player2Icon from '/Player2.png';
import player3Icon from '/Player3.png';
import player4Icon from '/Player4.png';
import bomba from '/bomba.png';
import coin from '/moneda-dolar.png';
import deactivation from '/deactivation.png';

const icons = {
  1: player1Icon,
  2: player2Icon,
  3: player3Icon,
  4: player4Icon
};

export default function Player({id, name, color, coins, defusers, bomb}) {
  return (
    <div className="player-profile" id={`Player-${id}`}>
      <div className='player-icon' style={{ outlineStyle: 'solid', outlineColor: color, outlineWidth: '3px'}}>
        <img src={icons[id]} alt={`player-icon-${id}`} className='icon'/>  
        {bomb && <img src={bomba} alt="bomba" className="bomb-icon" />}
      </div>
      <div className='profile-info-container'>
        <div className='player-name'>
          <h3>{name}</h3>
        </div>
        <div className='player-info-data'>
          <p className='data'>
            <img src={coin} alt="coin" className='info-icon'/>
            {coins}
          </p>
          <p className='data'>
            <img src={deactivation} alt="deactivation" className='info-icon'/>
            {defusers}
          </p>
        </div>
      </div>
    </div>
  )
}
