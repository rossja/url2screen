"use strict";

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const screenie = require("node-server-screenshot");

const outDir = __dirname + '/screenshots';
const inFile = './urls.txt';

function load(inFile, cb) {
  const outStream = new stream;
  const inStream = fs.createReadStream(inFile);
  var rl = readline.createInterface(inStream, outStream);
  var arr = [];

  rl.on('line', function(line) {
    arr.push(line);
  });

  rl.on('close', function() {
    console.log('done loading file: ', inFile);
    cb(arr, outDir);
  });
}

function capture(urls, outDir) {
  
  // create the outDir if it doesn't exist
  if (!fs.existsSync(outDir)){
    fs.mkdirSync(outDir);
  }
  
  for (var i=0; i < urls.length; i++) {
    const targetUrl = urls[i];
    const proto = targetUrl.split(':', 1)[0];
    const domainName = targetUrl.split('//', 3)[1];
    const outFile = outDir + '/' + proto + '_' + domainName + '.jpg';
  
    screenie.fromURL(targetUrl, outFile, function(){
        console.log("saved screenshot of " + domainName + " at " + outFile);
    });
  }
}

function main() {
  load(inFile, capture);
}

main();