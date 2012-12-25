var SC = SC || {};

SC.handleInput = function () {
  SC.game.handleInput();
};

SC.lastUpdate = 0;

SC.update = function () {
  SC.handleInput();
  if(SC.lastUpdate==0){
	SC.lastUpdate = new Date();
  }
  var nextUpdate = new Date(); 
  var elapsed = nextUpdate - SC.lastUpdate;
  SC.game.update(elapsed);
  SC.lastUpdate = nextUpdate;
  console.log("updated, elapsed time: "+elapsed);
};

SC.draw = function () {  
  var renderer = SC.renderer2d;
  return renderer.requestAnimFrame.apply(window, [function() { renderer.draw(); }]);
}

SC.run = function() {
  var loops = 0, skipTicks = 1000 / 60,
      maxFrameSkip = 10,
      nextGameTick = new Date().getTime();
  
  return function () {
    loops = 0;
    while (new Date().getTime() > nextGameTick && loops < maxFrameSkip) {
      SC.update();
      nextGameTick += skipTicks;
      loops++;
	}      
      if(loops) SC.draw();
	};
  };

$(function () {
  SC.game.init();
  SC.renderer2d.init();
  setInterval(SC.run(), 0);
});