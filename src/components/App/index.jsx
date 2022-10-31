import { useState } from 'react';
import { useEffect } from 'react';
import './App.scss';
import Flat from '../Flat'

const API_URL = 'https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json'

const App = () => {
  // useState to feed the flat's array with the response of the Fetch Api and iterate over it
  const [flats, setFlats] = useState([])

  // useEffect to Fetch only once (empty dependencies run once)
  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json()
      .then(data => setFlats(data)))
  }, [])

  return (
    <div className='app'>
      <div className='main'>
        <input className='search' type="text" />
        <div className='flats'>
          {flats.map((flat) => {
            return <Flat key={flat.id} name={flat.name} price={flat.price} imageUrl={flat.imageUrl} />
          })}
        </div>
      </div>
      <div className='map'></div>
    </div>
  );
}

export default App;
