import './Flat.scss';

const Flat = ( {price, name, imageUrl, onSelect, selected} ) => {

  const handleClick = () => {
    onSelect()
  }

  return (
    <div onClick={handleClick} className={selected ? "flat selected" : "flat"}>
      <img src={imageUrl} className="flat-picture" alt="The flat" />
      <div className='flat-title'>
        <span>{name}</span>
      </div>
      <div className='flat-price'>
        <span className='price'>€ {price}</span>
        <span>noite</span>
      </div>
    </div>
  )
}

export default Flat;
