/**
 * This boilerplate code is currently not used in extension.
 * You can enable background scripts by adding:
 * 
 *   "background": {
 *     "page": "background.html",
 *     "persistent": false
 *   },
 * 
 * to the manifest.json file
 */

// import browser from "webextension-polyfill";

// type Message = {
//   action: 'fetch',
//   value: null
// }

// type ResponseCallback = (data: any) => void

// async function handleMessage({action, value}: Message, response: ResponseCallback) {
//   if (action === 'fetch') {
//     const result = await fetch('https://meowfacts.herokuapp.com/');

//     const { data } = await result.json();

//     response({ message: 'success', data });
//   } else {
//     response({data: null, error: 'Unknown action'});
//   }
// }

// // @ts-ignore
// browser.runtime.onMessage.addListener((msg, sender, response) => {
//   handleMessage(msg, response);
//   return true;
// });
