var SC = SC || {};

SC.handleInput = function () {
  SC.game.handleInput();
};

SC.update = function (elapsed) {
  SC.handleInput();
  SC.game.update(elapsed);
};

SC.draw = function () {  
  var renderer = SC.renderer2d;
  renderer.requestAnimFrame.apply(window, [function() { renderer.draw(); }]);
}

SC.lastUpdate = 0;

SC.firstRun = true;

SC.run = function() {
  var loops = 0, skipTicks = 1000 / 50,
      maxFrameSkip = 10,
      nextGameTick = (new Date).getTime();
  
  return function () {
    loops = 0;
      while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
	    SC.update();
	    nextGameTick += skipTicks;
	    loops++;
	  }
	  SC.draw();
	};
  };

$(function () {
  SC.game.init();
  SC.renderer2d.init();
  setInterval(SC.run(), 0);
});