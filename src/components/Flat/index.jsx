import './Flat.scss';

const Flat = ( {key, price, name, imageUrl, selection} ) => {

  const handleClick = () => {
    selection(key)
  }

  return (
    <div onClick={handleClick} className="flat">
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
