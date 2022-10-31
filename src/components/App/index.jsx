import { useState } from 'react';
import { useEffect } from 'react';
import './App.scss';
import Flat from '../Flat'
import FlatMarker from '../FlatMarker'
import ReactMapboxGl from 'react-mapbox-gl'

const API_URL = 'https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiaWRlYWZlcm5hbmRhIiwiYSI6ImNsOXdxaHd4MjAzYnUzdHBrMjdmOTZhbjIifQ.iALVmX02XPRfKz0XYw44kw'
})

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
      <div className='map'>
        <Map
          zoom={[14]}
          center={[2.3522, 48.8566]}
          containerStyle={{ height: '100vh', width: '100%' }}
          style="mapbox://styles/mapbox/streets-v8" >
          {flats.map((flat) => {
            return (
              <FlatMarker key={flat.id} lng={flat.lng} lat={flat.lat}/>
              )
            })}
        </Map>
      </div>
    </div>
  );
}

export default App;
