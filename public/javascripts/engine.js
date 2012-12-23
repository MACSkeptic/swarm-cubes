var SC = SC || {};

SC.canvas = function () { return $('#foreground-canvas'); };

SC.context = function () {
  if (SC._context) {
    return SC._context;
  }

  var canvas = SC.canvas();
  canvas[0].width = window.innerWidth;
  canvas[0].height = window.innerHeight;
  SC.world.width = window.innerWidth;
  SC.world.height = window.innerHeight;

  SC._context = canvas[0].getContext('2d');

  return SC._context;
};

SC.clearScreen = function (context) {
  var width = SC.canvas().attr('width');
  var height = SC.canvas().attr('width');
  context.clearRect(0, 0, width, height);
};

SC.draw = function (context, elapsed) {
  var secretCanvas = $('<canvas>');
  var secretContext = secretCanvas[0].getContext('2d');

  secretCanvas.attr('width', SC.canvas().attr('width'));
  secretCanvas.attr('height', SC.canvas().attr('height'));
  secretCanvas.attr('id', 'foreground-canvas');

  SC.game.draw(secretContext, elapsed);

  SC.canvas().replaceWith(secretCanvas);
};

SC.handleInput = function () {
  SC.game.handleInput();
};

SC.update = function (elapsed) {
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
    var canvas = $('#background-canvas');
    var context = canvas[0].getContext('2d');
    canvas[0].width = window.innerWidth;
    canvas[0].height = window.innerHeight;
    var width = canvas.attr('width');
    var height = canvas.attr('width');
    var gradient = context.createLinearGradient(0, 0, width, height);
    SC.handleInput();

    gradient.addColorStop(0, '#8ED6FF');   
    gradient.addColorStop(1, '#004CB3');
    context.fillStyle = gradient;

    context.fillRect(0, 0, width, height);
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

