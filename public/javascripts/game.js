var SC = SC || {};

SC.game = SC.game || {};

SC.game.entities = [];

SC.game.init = function () {
  SC.game.playerCube = new core.WorldObject();

  movable.makeItMovable(SC.game.playerCube);

  SC.game.entities.push(SC.game.playerCube);
};

SC.game.draw = function(context, elapsed) {

};

SC.game.update = function(elapsed) {

};

SC.game.handleInput = function(elapsed) {

};
