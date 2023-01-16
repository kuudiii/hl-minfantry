import {init, start, fullscreen} from './hl-engine-js/lib/hl-engine.js';

let zipValveArrayBuffer;
let zipModArrayBuffer;

init({
  canvas: document.getElementById('canvas'),
  location: 'hl-engine-js/lib'
});

const zips = [
  "valve-trimmed.zip",
  "minfantry.zip",
]

async function loadZips() {
  // fetch all zips in parallel
  const responses = await Promise.all(zips.map(zip => fetch(zip)));
  // convert responses to array buffers
  const arrayBuffers = await Promise.all(responses.map(response => response.arrayBuffer()));

  zipValveArrayBuffer = arrayBuffers[0];
  zipModArrayBuffer = arrayBuffers[1];

  document.getElementById('start').disabled = false;
}

loadZips();

document.getElementById('fullscreen').onclick = fullscreen

document.getElementById('start').onclick = function() {
  start({
    zipValve: zipValveArrayBuffer,
    zipMod: zipModArrayBuffer,
    mod: "minfantry",
    map: "TR2",
    fullscreen: true,
  });
};