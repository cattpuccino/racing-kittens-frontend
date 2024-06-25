import Endpoint from '../APIHandler';


// Modificar para que se muestre el resultado del dado
export default function EndTurn({setDataArr, params}) {
    return (
        <div>        
            <Endpoint endpoint="end_turn" method="PATCH" setDataArr={setDataArr} params={params}/>     
        </div>
    )
}