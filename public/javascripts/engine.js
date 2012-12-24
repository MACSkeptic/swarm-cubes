var SC = SC || {};

SC.handleInput = function () {
  SC.game.handleInput();
};

SC.update = function (elapsed) {
  SC.game.update(elapsed);
};

SC.lastUpdate = 0;

SC.go = function () {
  var renderer = SC.renderer2d;
  if(SC.lastUpdate == 0) {
    SC.game.init();
    renderer.init();
    SC.lastUpdate = new Date();
  } else {
    var currentUpdate = new Date();
    var elapsed = currentUpdate - SC.lastUpdate;
    SC.update(elapsed);
    SC.handleInput();
    SC.lastUpdate = currentUpdate;
    renderer.draw(elapsed);
  }
  renderer.requestAnimFrame.call(window, function() { SC.go(); });
}

$(SC.go);