import { Timeframe } from '@src/types';

const MTSocketApiService = {
  start: () => {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once('start-mt-socket-api', (result) => {
        if (result) {
          resolve(true);
        } else {
          reject(new Error('Cant.'));
        }
      });
      window.electron.ipcRenderer.sendMessage('start-mt-socket-api');
    });
  },
  stop: () => {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once('stop-mt-socket-api', (result) => {
        if (result) {
          resolve(true);
        } else {
          reject(new Error('Cant.'));
        }
      });
      window.electron.ipcRenderer.sendMessage('stop-mt-socket-api');
    });
  },
  getSymbolList: () => {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once('get-symbol-list', (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Cant.'));
        }
      });
      window.electron.ipcRenderer.sendMessage('get-symbol-list');
    });
  },
  startOHLCTracker: (symbols: string[], timeframe: Timeframe) => {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once('start-ohlc-tracker', (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Cant.'));
        }
      });
      window.electron.ipcRenderer.sendMessage(
        'start-ohlc-tracker',
        symbols,
        timeframe,
      );
    });
  },
  stopOHLCTracker: (timeframe: Timeframe) => {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once('stop-ohlc-tracker', (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Cant.'));
        }
      });
      window.electron.ipcRenderer.sendMessage('stop-ohlc-tracker', timeframe);
    });
  },
  subscribeForTracks: () => {
    window.electron.ipcRenderer.on('update-ohlc', (value: unknown) => {
      console.log(value);
    });
  },
};

export default MTSocketApiService;
