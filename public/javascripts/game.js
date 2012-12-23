var SC = SC || {};

SC.game = SC.game || {};

SC.game.init = function () {
  SC.game.entities = [];

  SC.game.playerCube = new core.WorldObject();

  SC.cube.makeItACube(SC.game.playerCube);

  SC.game.entities.push(SC.game.playerCube);
};

SC.game.draw = function(context, elapsed) {
  context.fillStyle = 'red';

  context.fillRect(
    SC.game.playerCube.characteristics.movable.position.x,
    SC.game.playerCube.characteristics.movable.position.y,
    SC.game.playerCube.characteristics.cube.width,
    SC.game.playerCube.characteristics.cube.height
  );

  _.each(SC.game.playerCube.characteristics.cube.shots, function (shot) {
    context.fillRect(
      shot.characteristics.movable.position.x,
      shot.characteristics.movable.position.y,
      30,
      30
    );
  });
};

SC.game.update = function(elapsed) {
  SC.game.playerCube.update(elapsed);
  _.each(SC.game.playerCube.characteristics.cube.shots, function (shot) {
    shot.update(elapsed);
  });
};

SC.game.handleInput = function(elapsed) {
  keypress.register_combo({
    'keys'              : 'a',
    'on_keydown'        : SC.game.playerCube.leftPressed,
    'this'              : SC.game.playerCube,
    'prevent_default'   : true,
    'prevent_repeat'    : false,
    'is_exclusive'      : true
  });
  keypress.register_combo({
    'keys'              : 'd',
    'on_keydown'        : SC.game.playerCube.rightPressed,
    'this'              : SC.game.playerCube,
    'prevent_default'   : true,
    'prevent_repeat'    : false,
    'is_exclusive'      : true
  });
  keypress.register_combo({
    'keys'              : 's',
    'on_keydown'        : SC.game.playerCube.downPressed,
    'this'              : SC.game.playerCube,
    'prevent_default'   : true,
    'prevent_repeat'    : false,
    'is_exclusive'      : true
  });
  keypress.register_combo({
    'keys'              : 'w',
    'on_keydown'        : SC.game.playerCube.upPressed,
    'this'              : SC.game.playerCube,
    'prevent_default'   : true,
    'prevent_repeat'    : false,
    'is_exclusive'      : true
  });

  keypress.register_combo({
    'keys'              : 'left',
    'on_keydown'        : SC.game.playerCube.shootLeft,
    'this'              : SC.game.playerCube,
    'prevent_default'   : true,
    'prevent_repeat'    : false,
    'is_exclusive'      : true
  });

  keypress.register_combo({
    'keys'              : 'right',
    'on_keydown'        : SC.game.playerCube.shootRight,
    'this'              : SC.game.playerCube,
    'prevent_default'   : true,
    'prevent_repeat'    : false,
    'is_exclusive'      : true
  });

  keypress.register_combo({
    'keys'              : 'up',
    'on_keydown'        : SC.game.playerCube.shootUp,
    'this'              : SC.game.playerCube,
    'prevent_default'   : true,
    'prevent_repeat'    : false,
    'is_exclusive'      : true
  });

  keypress.register_combo({
    'keys'              : 'down',
    'on_keydown'        : SC.game.playerCube.shootDown,
    'this'              : SC.game.playerCube,
    'prevent_default'   : true,
    'prevent_repeat'    : false,
    'is_exclusive'      : true
  });
};
