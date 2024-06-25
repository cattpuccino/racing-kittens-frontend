import '../styles/pages.css'
import bomba from '/bomba.png'
import flag from '/carreras.png'
import deactivation from '/deactivation.png'
import coin from '/moneda-dolar.png'

export default function Instructions() {
    return (
        <div className='instructions'>
            <h1>Como Jugar</h1>
            <div className='content'>
                <p>
                    Este es un juego de carrera por quien llega primero a la meta. El funcionamiento es simple, 4 
                    jugadores lanzan un dado por cada turno para llegar a la meta, pero entre ellos hay una 
                    bomba, la cual puede explotar si esta en tus manos, junta monedas y lanzala a otros jugadores 
                    para evitar explotar y volver al inicio. 
                </p>
                <img src={flag} alt="flag" className='img'/>
            </div>
            <h2>¿Como funciona la bomba?</h2>
            <div className="content">
                <p>
                    Inicialmente de manera aleatoria, se asignará una bomba a alguno de los jugadores de la 
                    partida. El jugador que la posee puede lanzar la bomba por 6 monedas a un rival, y este rival 
                    vuelve al inicio y debe comenzar a correr de nuevo, pero esta vez con el poder de la bomba. 
                    Pero hay que tener cuidado porque la bomba dura 3 turnos por jugador, en el último esta 
                    explota. 
                    El lanzamiento de la bomba, el jugador puede realizarlo durante su turno siempre que tenga 
                    la bomba y disponible 6 monedas para pagar por esta acción. 
                </p>
                <img src={bomba} alt="bomba" className='img'/>
            </div>
            <h2>¿Desactivación?</h2>
            <div className="content">
                <p>
                    Para poder frenar el poder de la bomba existen las desactivaciones, este objeto permite evitar 
                    el daño que hace una bomba. Entonces, si posees la bomba en el momento que explota, pero tienes un 
                    botón de desactivación, el explosivo no tiene efecto y pierdes el botón de desactivación.  
                    El costo de una desactivación en la tienda es de 12 monedas. Inicialmente todos los jugadores comienzan 
                    con una desactivación, y el jugador puede decidir si utilizar la desactivación o no. 
                </p>
                <img src={deactivation} alt="deactivation" className='img'/>
            </div>
            <h2>¿Cómo funcionan las monedas?</h2>
            <div className="content">
                <p>
                    Las monedas son el recurso principal del juego, estas permiten al jugador poder lanzar la 
                    bomba, comprar desactivaciones, y adquirir power ups. Todos los jugadores comienzan con 
                    un total de 4 monedas, y al final de cada turno reciben 3 más. Las monedas también se 
                    pueden conseguir en las casillas de fortuna. 
                </p>
                <img src={coin} alt="coin" className='img'/>
            </div>
        </div>
    )
}