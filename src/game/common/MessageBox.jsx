import {useState, useEffect} from 'react';

// Modificar para que se muestre el resultado del dado
export default function MessageBox({setDataArr, params}) {
  const [message, setMessage] = useState('');
  useEffect(() => {
      try {
        let body = JSON.parse(params.body);
        if (body.message !== undefined){
          setMessage(body.message);
        }
      } catch (error) {
        console.error(error);
      }
    }, [params]);

  return (
      <div>        
          <h3>{message}</h3>
      </div>
  )
}