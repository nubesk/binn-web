import React, { useEffect } from 'react';

import BottleList from './components/BottleList';
import FormPostBottle from './components/FormPostBottle';

import Bottles from './hooks/Bottles';
import Ids from './hooks/Ids';

export default function App(): JSX.Element {
  const bottles = Bottles();
  const [ ids, useIdHandler ] = Ids(bottles);
  return (
    <div className="App">
      <React.StrictMode>
        <FormPostBottle ids={ ids } useIdHandler={ useIdHandler }/>
        <BottleList bottles={ bottles }/>
      </React.StrictMode>
    </div>
  );
}
