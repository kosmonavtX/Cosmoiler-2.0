//const reopenTimeouts = [2000, 5000, 10000, 30000, 60000];
import ReconnectingWebSocket from 'reconnecting-websocket'
import log from './debug.js'
//import { decode, encode } from '@msgpack/msgpack'
/**
 * Create a writable store based on a web-socket.
 * Data is transferred as JSON.
 * Keeps socket open (reopens if closed) as long as there are subscriptions.
 * @param {string} url the WebSocket url
 * @param {any} initialValue store value used before 1st. response from server is present
 * @param {string[]} socketOptions transparently passed to the WebSocket constructor
 * @return {Store}
 */
export function websocketStore(url, initialValue, protocols, socketOptions) {
  let socket;
  const subscriptions = new Set();

  function close() {
    if (socket) {
      socket.close();
      socket = undefined;
      subscriptions.forEach(subscription => subscription({connect: false}));
    }
  }

  async function open() {

    if (socket) {
      //socket.open();
      log('ReadyState = ', socket.readyState)
      return;
    }

  socket = new ReconnectingWebSocket(url, protocols, socketOptions); //new WebSocket(url, socketOptions);
  //socket = new WebSocket(url);

  socket.addEventListener('message', event => {
    initialValue = JSON.parse(event.data);
    subscriptions.forEach(subscription => subscription({...initialValue, connect: true}));

    log('[Input]: ', initialValue);

  })

    socket.addEventListener('close', () => {
     socket.reconnect()
     log('WEBSOCKET: close');
     //socket.open();
    })

    socket.addEventListener('error', event => {
      //log(event);
      subscriptions.forEach(subscription => subscription(event))
    })

    return new Promise((resolve, reject) => {
      socket.addEventListener('open', event => {
        resolve()
      })
    });
  }

  return {
    open() {
      open()
    },
    close() {
      close()
    },
    set(value) {
      open().then(() => {
        socket.send(JSON.stringify(value))
      });
    },
    subscribe(subscription) {
      open();
      subscription(initialValue);
      subscriptions.add(subscription);
      return () => {
        subscriptions.delete(subscription);
        if (subscriptions.size === 0) {
          close();
        }
      };
    }
  };
}

export default websocketStore;
