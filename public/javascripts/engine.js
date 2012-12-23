var SC = SC || {};

SC.canvas = function () { return $('#foreground-canvas'); };

SC.context = function () {
  if (SC._context) {
    return SC._context;
  }

  var canvas = SC.canvas();
  canvas[0].width = canvas.css('width').replace(/px$/, '');
  canvas[0].height = canvas.css('height').replace(/px$/, '');
  SC._context = canvas[0].getContext("2d");

  return SC._context;
};

SC.clearScreen = function (context) {
  var width = SC.canvas().attr('width');
  var height = SC.canvas().attr('width');
  var gradient = context.createLinearGradient(0, 0, width, height);

  gradient.addColorStop(0, '#8ED6FF');   
  gradient.addColorStop(1, '#004CB3');
  context.fillStyle = gradient;

  context.fillRect(0, 0, width, height);
};

SC.draw = function (context, elapsed) {
  SC.clearScreen(context);

  SC.game.draw(context, elapsed);
};

SC.handleInput = function () {
  SC.game.handleInput();
};

SC.update = function (elapsed) {
  SC.handleInput();
  SC.game.update(elapsed);
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
    SC.game.init();
    SC.lastUpdate = new Date();
  } else {
    var currentUpdate = new Date();						
    var elapsed = currentUpdate - SC.lastUpdate;
    SC.update(elapsed);
    SC.lastUpdate = currentUpdate;
    SC.draw(SC.context(), elapsed);
  }
  SC.requestAnimFrame.call(window, function() { animate(); });
}

$(animate);

