import './Flat.scss';

import { useState } from 'react';

const Flat = ( {price, name, imageUrl} ) => {

  const [selected, setSelected] = useState(false)

  const handleClick = () => {
    setSelected(!selected)
  }

  return (
    <div onClick={handleClick} className={selected ? 'flat selected' : 'flat'}>
      <img src={imageUrl} className="flat-picture" alt="The flat" />
      <div className='flat-title'>
        <span>{name}</span>
      </div>
      <div  className='flat-price' >
        <span  className='price'>€ {price}</span>
        <span>noite</span>
      </div>
    </div>
  )
}

export default Flat;
