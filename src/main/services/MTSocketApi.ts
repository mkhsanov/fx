import Net from 'net';

import { Timeframe } from '@src/types';
import {
  MT_SOCKET_API_HOST,
  MT_SOCKET_API_COMMAND_PORT,
  MT_SOCKET_API_TRACKER_PORT,
  MESSAGES,
} from './constants';

const commandSocket = new Net.Socket();
const trackerSocket = new Net.Socket();

const MTSocketApi = {
  start: () => {
    return new Promise((resolve, reject) => {
      try {
        commandSocket.connect(MT_SOCKET_API_COMMAND_PORT, MT_SOCKET_API_HOST);
        trackerSocket.connect(MT_SOCKET_API_TRACKER_PORT, MT_SOCKET_API_HOST);
        resolve(true);
      } catch (error) {
        reject();
      }
    });
  },
  stop: () => {
    return new Promise((resolve, reject) => {
      try {
        commandSocket.destroy();
        trackerSocket.destroy();
        resolve(true);
      } catch (error) {
        reject();
      }
    });
  },
  getSymbolList: () => {
    return new Promise((resolve, reject) => {
      try {
        let message = '';

        commandSocket.on('end', () => {
          resolve(JSON.parse(message));
        });

        commandSocket.on('data', (chunk: Buffer) => {
          message += chunk.toString();
          commandSocket.end();
        });

        commandSocket.write(
          `${JSON.stringify({ MSG: MESSAGES.SYMBOL_LIST })}\r\n`,
        );
      } catch (error) {
        reject();
      }
    });
  },
  startOHLCTracker: (symbols: string[], timeframe: Timeframe) => {
    return new Promise((resolve, reject) => {
      try {
        commandSocket.write(
          `${JSON.stringify({
            MSG: MESSAGES.TRACK_OHLC,
            SYMBOLS: symbols,
            TIMEFRAME: timeframe,
          })}\r\n`,
        );
        commandSocket.on('data', () => {
          commandSocket.end();
        });
        resolve(true);
      } catch (error) {
        reject();
      }
    });
  },
  stopOHLCTracker: (timeframe: Timeframe) => {
    return new Promise((resolve, reject) => {
      try {
        commandSocket.write(
          `${JSON.stringify({
            MSG: MESSAGES.TRACK_OHLC,
            SYMBOLS: [],
            TIMEFRAME: timeframe,
          })}\r\n`,
        );
        commandSocket.on('data', () => {
          commandSocket.end();
        });
        resolve(true);
      } catch (error) {
        reject();
      }
    });
  },
  subscribeOHLCTracker: (callback: (json: unknown) => void) => {
    return new Promise((resolve, reject) => {
      try {
        trackerSocket.on('data', (chunk) => {
          callback(JSON.parse(chunk.toString()));
        });
        resolve(true);
      } catch (error) {
        reject();
      }
    });
  },
};

export default MTSocketApi;
