import React, { useEffect } from 'react';

import Routing from '@components/Routing';

import './App.css';
import MTSocketApiService from '@src/renderer/services/MTSocketApi';

const App: React.FC = () => {
  useEffect(() => {
    (async () => {
      await MTSocketApiService.start();
      // const symbolList = await MTSocketApiService.getSymbolList();
      // console.log(symbolList);
      await MTSocketApiService.startOHLCTracker(['EURUSD'], 'PERIOD_M1');
      MTSocketApiService.subscribeForTracks();
    })();
  }, []);

  return <Routing />;
};

export default App;
