import React from 'react';
import CardView from './CardView';
import { getDefaultNormalizer } from '@testing-library/react';
import test from '../Images/test.jpg'


const CardViewcontroller = () => {
  return (
    <div className="mainDiv">


    <div>
      <CardView
        image={test}
        title="Card Title"
        description="This is a card description."
      />
      <CardView
        image={test}
        title="Card Title 2"
        description="This is another card description."
      />
      <CardView
        image={test}
        title="Card Title 3"
        description="This is another card description."
      />
    </div>

    <div className='sideCardView'>
  
    </div>

    
    </div>

  );
};


export default CardViewcontroller;