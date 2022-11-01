import { useState } from 'react';
import { useEffect } from 'react';
import './App.scss';
import Flat from '../Flat'
import Map, {Marker, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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

  // useState to define the map viewport and props
  const [viewState, setViewState] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12
  });

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
          {...viewState}
          onMove={event => setViewState(event.viewState)}
          style={{width: '100%', height: '100vh'}}
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
          {flats.map((flat) => {
            return (
              <Marker
                longitude={flat.lng}
                latitude={flat.lat}>
                <span class="marker">€{flat.price}</span>
              </Marker>
            )
          })}
          <NavigationControl />
        </Map>
      </div>
    </div>
  );
}

export default App;
