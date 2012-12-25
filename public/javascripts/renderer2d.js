SC.renderer2d = SC.renderer2d || {};

SC.renderer2d.canvas = function () { return $('#foreground-canvas'); };

SC.renderer2d.clearScreen = function (context) {
  var width = SC.renderer2d.canvas().attr('width');
  var height = SC.renderer2d.canvas().attr('width');
  context.clearRect(0, 0, width, height);
};

SC.renderer2d.context = function () {
  if (SC._context) {
    return SC._context;
  }

  var canvas = SC.renderer2d.canvas();
  canvas[0].width = window.innerWidth;
  canvas[0].height = window.innerHeight;
  SC.world.width = window.innerWidth;
  SC.world.height = window.innerHeight;

  SC._context = canvas[0].getContext('2d');

  return SC._context;
};

SC.renderer2d.draw = function () {
  var context = SC.renderer2d.context();
  SC.renderer2d.clearScreen(context);

  var secretCanvas = $('<canvas>');
  var secretContext = secretCanvas[0].getContext('2d');

  secretCanvas.attr('width', SC.renderer2d.canvas().attr('width'));
  secretCanvas.attr('height', SC.renderer2d.canvas().attr('height'));
  secretCanvas.attr('id', 'foreground-canvas');

  SC.game.draw(secretContext);

  //SC.renderer2d.canvas().replaceWith(secretCanvas);
  context.drawImage(secretCanvas[0], 0, 0);
};

SC.renderer2d.clearScreen = function (context) {
  var width = SC.renderer2d.canvas().attr('width');
  var height = SC.renderer2d.canvas().attr('width');
  context.clearRect(0, 0, width, height);
};

SC.renderer2d.init = function () {
	var canvas = $('#background-canvas');
    var context = canvas[0].getContext('2d');
    canvas[0].width = window.innerWidth;
    canvas[0].height = window.innerHeight;

    var width = canvas.attr('width');
    var height = canvas.attr('width');
    var gradient = context.createLinearGradient(0, 0, width, height);

    gradient.addColorStop(0, '#000');
    gradient.addColorStop(1, '#222');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
}

SC.renderer2d.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.oRequestAnimationFrame || 
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

