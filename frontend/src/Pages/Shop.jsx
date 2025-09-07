import React from 'react';
import Home from '../Components/Home/Home';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import Photos from '../Components/Photos/Photos';  // ✅ renamed
import Roll from '../Components/Roll/Roll';

const Shop = () => {
  return (
    <div>
      <Home />
      <Popular />
      <Offers />
      <Photos />
      <Roll />
    </div>
  );
};

export default Shop;
