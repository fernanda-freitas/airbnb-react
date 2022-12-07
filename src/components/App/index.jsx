import './App.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import Flat from '../Flat'
import { useState, useEffect } from 'react';
import Map, {Marker, NavigationControl} from 'react-map-gl';
import Search from '../Search'
import Pluralize from 'react-pluralize'

const API_URL = 'https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json'

const App = () => {
  const [flats, setFlats] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    fetch(API_URL)
    .then(response => response.json()
    .then(data => setFlats(data)))
  }, [])

  const [viewState, setViewState] = useState({
    latitude: 48.884211,
    longitude: 2.34689,
    zoom: 14
  });

  const handleSearch = (text) => {
    setSearchText(text)
  }

  const filteredFlats = flats.filter(flat => flat.name.match(new RegExp(searchText, 'i')))

  const handleFlatSelection = (flatId) => {
    // Se um segundo elemento com id diferente for selecionado, fazer o unselect
    console.log(flatId)
  }

  return (
    <div className='app d-flex row'>
      <div className='main col-md-5'>
        <Search onChange={handleSearch} />
        <Pluralize className='flats-available' singular={'Flat'} count={flats.length} />
        <div className='flats'>
          {filteredFlats.map((flat) => {
            return <Flat selection={handleFlatSelection} key={flat.id} name={flat.name} price={flat.price} imageUrl={flat.imageUrl} />
          })}
        </div>
      </div>
      <div className='map col-md-7'>
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
