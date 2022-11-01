import { useState } from 'react';
import { useEffect } from 'react';
import './App.scss';
import Flat from '../Flat'
import Map, {Marker, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Search from '../Search'

const API_URL = 'https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json'

const App = () => {
  // useState to feed the flat's array with the response of the Fetch Api and iterate over it
  const [flats, setFlats] = useState([])
  const [searchText, setSearchText] = useState('')

  // useEffect to Fetch only once (empty dependencies run once)
  useEffect(() => {
    fetch(API_URL)
    .then(response => response.json()
    .then(data => setFlats(data)))
  }, [])

  // useState to define the map viewport and props
  const [viewState, setViewState] = useState({
    latitude: 48.884211,
    longitude: 2.34689,
    zoom: 14
  });

  const handleSearch = (text) => {
    setSearchText(text)
  }

  const filteredFlats = flats.filter(flat => flat.name.match(new RegExp(searchText, 'i')))

  return (
    <div className='app'>
      <div className='main'>
        <Search onSearch={handleSearch} />

        <div className='flats'>
          {filteredFlats.map((flat) => {
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
                key={flat.id}
                longitude={flat.lng}
                latitude={flat.lat}>
                <span className="marker">€{flat.price}</span>
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
