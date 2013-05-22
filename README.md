# node-dxf-to-png

DXF to PNG node module and command line tool.

# usage

``` js
dxftopng(__dirname+'/data/test.dxf', {width: 300, usemapping: true}, function (err, pngbuff) {
    // do something with the buffer
});
```

mapping uses the node-dxf text mapping algorithm for text elements.

``` shell
$ node-dxf-to-png -i test/data/test.dxf -w 400 -m true -o mydxfas.png
```