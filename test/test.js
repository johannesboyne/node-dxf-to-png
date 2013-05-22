var test    = require('tape');
var dxftopng = require('../');

test('dxf to png', function (t) {
  t.plan(1);
  dxftopng(__dirname+'/data/test.dxf', {width: 300, usemapping: true}, function (err, pngbuff) {
     t.equal(Buffer.isBuffer(pngbuff), true);
  });
});