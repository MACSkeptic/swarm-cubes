var SC = SC || {};

SC.context = function () {
  if (SC._context) {
    return SC._canvas.getContext("2d");
  }

  SC._context =  $("foreground-canvas")[0].getContext("2d");

  return SC._context;
};

SC.draw = function () {
};

SC.update = function (elapsed) {
  console.log('update');
  console.log(elapsed);
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
  SC.draw();
  SC.requestAnimFrame.call(window, function() { animate(); });
}

$(animate);

