#!/usr/bin/env node
var argv     = require('optimist').argv;
var fs       = require('fs');
var dxftopng = require('../');

if (argv.h || argv.help) {
  return fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
}

dxftopng(argv.i || argv.input, {width: argv.w || argv.width || 300, usemapping: argv.m || argv.mapping || false}, function (err, pngbuff) {
  fs.writeFile(argv.o || argv.out || 'out.png', pngbuff, 'binary', function () {
    console.log('done, written to ' + (argv.o || argv.out || 'out.png'));
  });
});