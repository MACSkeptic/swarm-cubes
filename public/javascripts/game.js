var SC = SC || {};

SC.context = function () {
  if (SC._context) {
    return SC._context;
  }

  var canvas = $("#foreground-canvas");
  canvas[0].width = canvas.css('width').replace(/px$/, '');
  canvas[0].height = canvas.css('height').replace(/px$/, '');
  SC._context = canvas[0].getContext("2d");

  return SC._context;
};

SC.draw = function (context, elapsed) {
  context.fillStyle = 'red';
  context.fillRect(0, 0, 20, 20);
};

SC.update = function (elapsed) {
};

SC.handleInput = function () {
};

SC.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.oRequestAnimationFrame || 
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

SC.lastUpdate = 0;

function animate() {
  if(SC.lastUpdate == 0) {
    SC.lastUpdate = new Date();
  } else {
    var currentUpdate = new Date();						
    SC.update(currentUpdate - SC.lastUpdate);
    SC.lastUpdate = currentUpdate;
  }
  SC.draw(SC.context());
  SC.requestAnimFrame.call(window, function() { animate(); });
}

$(animate);

