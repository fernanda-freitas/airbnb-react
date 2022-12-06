import './Search.scss';

const Search = ({ onChange }) => {

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return <input className="search" type="text" placeholder="Search for flat" onChange={handleChange} />
}

export default Search;
