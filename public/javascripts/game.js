var SC = SC || {};

SC.game = SC.game || {};

SC.game.init = function () {
  SC.game.playerCube = new core.WorldObject();

  SC.cube.makeItACube(SC.game.playerCube);


  SC.world.objects.push(SC.game.playerCube);
  SC.world.enemyShots = [];
  SC.audio.background();

  SC.game.socket = io.connect($url);
  SC.game.socket.on('broadcast', function (data) {
    SC.world.enemyShots = [];
    var enemyObjects = JSON.parse(data);
    _.each(enemyObjects, function (enemyData) {
      var enemy = SC.objectFactory(enemyData);
      SC.world.enemyShots.push(enemy);
    });
  });
};

SC.game.draw = function(context, elapsed) {
  context.strokeStyle = 'yellow';
  context.fillStyle = 'orange';

  _.each(SC.world.objects, function (worldObject) {
    worldObject.draw(context, elapsed);
  });

  context.strokeStyle = 'red';
  context.fillStyle = 'pink';

  _.each(SC.world.enemyShots, function (worldObject) {
    worldObject.draw(context, elapsed);
  });
};

SC.game.update = function(elapsed) {
  SC.game.socket.emit('update', JSON.stringify(SC.world.objects));
  _.each(SC.world.objects, function (worldObject) {
    _.each(SC.world.enemyShots,function (enemyShot) {
      if(collision.areColliding(enemyShot,worldObject)){
        worldObject.characteristics.movable.position.x=-100;
        if(!_.contains(enemyShot.flavour,"cube")){
          enemyShot.characteristics.movable.position.x=-100;
        }
      }
    });
    worldObject.update(elapsed);
  });

  SC.world.clearObjects();
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
