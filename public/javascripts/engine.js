var SC = SC || {};

SC.handleInput = function () {
  SC.game.handleInput();
};

SC.update = function (elapsed) {
  SC.handleInput();
  SC.game.update(elapsed);
};

SC.draw = function () {
  debugger
  var renderer = SC.renderer2d;
  renderer.requestAnimFrame.apply(window, [function() { renderer.draw(); }]);
}

SC.lastUpdate = 0;

SC.go = function () {

  if(SC.lastUpdate == 0) {
    SC.game.init();
    renderer.init();
    SC.lastUpdate = new Date();
  } else {
    var currentUpdate = new Date();
    var elapsed = currentUpdate - SC.lastUpdate;
    SC.update(elapsed);
    
    SC.lastUpdate = currentUpdate;    
  }  
}

SC.firstRun = true;

SC.run = function() {
  if(SC.firstRun){
    SC.game.init();
    SC.renderer2d.init();
	firstRun=false;
  }
  
  var loops = 0, skipTicks = 1000 / 50,
      maxFrameSkip = 10,
      nextGameTick = (new Date).getTime();
  
  return function () {
	debugger
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
  setInterval(SC.run()(), 5);
});