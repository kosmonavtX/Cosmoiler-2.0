//const reopenTimeouts = [2000, 5000, 10000, 30000, 60000];
import ReconnectingWebSocket from 'reconnecting-websocket'
import {log} from './debug.js'
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
      return;
    }

  socket = new ReconnectingWebSocket(url, protocols, socketOptions); //new WebSocket(url, socketOptions);

/*   async function decodeFromBlob(blob) {
    return decode(await blob.arrayBuffer());
  } */

  socket.addEventListener('message', event => {
    initialValue = JSON.parse(event.data);
    subscriptions.forEach(subscription => subscription({...initialValue, connect: true}));

    //const view = new DataView(event.data);
    //console.log(view.getInt32(0));
    log('[Input]: ', initialValue);

/*     let arr = decodeFromBlob(event.data);
    console.log(arr); */
/*     const encoded = encode({ m: 0, p: 0 });
    console.log(encoded);
    let bin = new Uint8Array([130, 161, 109, 0, 161, 112, 0]); */
    //const decoded = decode(bin);
    //console.log(decoded);

/*     decodeFromBlob(event.data).then((data) => {
      console.log("Decoded = ",data);
     // subscriptions.forEach(subscription => subscription({...value, connect: true}));
      subscriptions.forEach(subscription => subscription({data, connect: true}));
    }); */


/*     let reader = new FileReader();
    reader.readAsArrayBuffer(event.data);

    reader.addEventListener("loadend", function() {
      // reader.result contains the contents of blob as a typed array
      let msgbin = new Uint8Array(reader.result);
      console.log("Input: ", msgbin.toString('utf8'));
      let dec = decode(msgbin)
      console.log("xxxd = ", dec)
     // subscriptions.forEach(subscription => subscription({data: dec, connect: true}));
    }); */

/*       const text = event.data.text();
    console.log(text) */
    //subscriptions.forEach(subscription => subscription({...initialValue, connect: true}));

  })

    socket.addEventListener('close', () => {
      socket.reconnect()
    })

    socket.addEventListener('error', event => {
      log(event);
      subscriptions.forEach(subscription => subscription(event))
    })

    return new Promise((resolve, reject) => {
      socket.addEventListener('open', event => {
        resolve()
      })
    });
  }

  return {
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
