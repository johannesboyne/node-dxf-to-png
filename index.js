var nodedxf = require('node-dxf');
var Canvas  = require('canvas');
var fs      = require('fs');

function Point (x,y) {
  this.x = x;
  this.y = y;
}

module.exports = function (dxfpath, opts, fn) {
  nodedxf(dxfpath, function (res) {

    if (!opts) {
      opts.width      = 300;
      opts.usemapping = false;
    }

    var scalingfactor = opts.width/res.contour.width;

    var t_canvas = new Canvas(res.contour.width * scalingfactor,res.contour.height * scalingfactor);
    var t_ctx    = t_canvas.getContext('2d');
    // draw polygons

    res.polygons.forEach(function (polygon, p) {
      t_ctx.save();
      t_ctx.fillStyle = 'rgba(92,98,106,0.8)';

      t_ctx.beginPath();

      var start = new Point(0,0);

      polygon.points.forEach(function (point, i) {
        point.x = (point.x - res.contour.min.x) * scalingfactor;
        point.y = (point.y - res.contour.min.y) * scalingfactor;

        if (i === 0) {
          t_ctx.moveTo(point.x, point.y);
          start.x = point.x;
          start.y = point.y;
        } else if (i < polygon.points.length) {
          t_ctx.lineTo(point.x, point.y);
        }
        if (i === polygon.points.length - 1) {
          t_ctx.lineTo(start.x, start.y);
          t_ctx.closePath();
          t_ctx.fill();
          t_ctx.restore();
        }
      });
    });

    t_ctx.font = 'normal '+Math.round(10+scalingfactor/3)+'px Arial, sans-serif';
    t_ctx.fillStyle = 'rgba(30,30,30,1)';
    
    if (opts.usemapping) {
      res.mappings.forEach(function (mapping) {
        t_ctx.fillText(String(res.texts[mapping.textIndex].txt.txt), (res.texts[mapping.textIndex].txt.x - res.contour.min.x) * scalingfactor, (res.texts[mapping.textIndex].txt.y - res.contour.min.y) * scalingfactor); 
      });
    } else {
      res.texts.forEach(function (texts) {
        t_ctx.fillText(String(texts.txt.txt), (texts.txt.x - res.contour.min.x) * scalingfactor, (texts.txt.y - res.contour.min.y) * scalingfactor); 
      });
    }
  
    t_canvas.toBuffer(fn);
  });
}