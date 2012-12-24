var SC = SC || {};
SC.cube = SC.cube || {};

SC.cube.original = {
  defaultSpeed: 300,
  defaultShotSpeed: 1000,
  shots: [],
  width: 50,
  name: 'cube',
  height: 50
};

SC.cube.makeItACube = (function () {

  function rightPressed() {
    this.characteristics.movable.speed.x = this.characteristics.cube.defaultSpeed;
    this.characteristics.movable.speed.y = 0;
  }

  function leftPressed() {
    this.characteristics.movable.speed.x = -this.characteristics.cube.defaultSpeed;
    this.characteristics.movable.speed.y = 0;
  }

  function upPressed() {
    this.characteristics.movable.speed.x = 0;
    this.characteristics.movable.speed.y = -this.characteristics.cube.defaultSpeed;
  }

  function downPressed() {
    this.characteristics.movable.speed.x = 0;
    this.characteristics.movable.speed.y = this.characteristics.cube.defaultSpeed;
  }

  function createShot(customize) {
    var shot = core.WorldObject();
    SC.shot.makeItAShot(shot);

    shot.characteristics.movable.position.x = 
      this.characteristics.movable.position.x + 
        (this.characteristics.movable.width - shot.characteristics.movable.width)/2;
    shot.characteristics.movable.position.y = 
      this.characteristics.movable.position.y + 
        (this.characteristics.movable.height - shot.characteristics.movable.height)/2;

    customize.apply(this, [shot]);

    shot.characteristics.movable.speed.x += this.characteristics.movable.speed.x;
    shot.characteristics.movable.speed.y += this.characteristics.movable.speed.y;

    SC.world.objects.push(shot);

    return shot;
  }

  function shootLeft() {
    SC.audio.spacegun();
    return createShot.apply(this, [function (shot) { 
      shot.characteristics.movable.speed.x = -this.characteristics.cube.defaultShotSpeed;
      shot.characteristics.movable.speed.y = 0;
    }]);
  }

  function shootRight() {
    SC.audio.spacegun();
    return createShot.apply(this, [function (shot) { 
      shot.characteristics.movable.speed.x = this.characteristics.cube.defaultShotSpeed;
      shot.characteristics.movable.speed.y = 0;
    }]);
  }

  function shootUp() {
    SC.audio.spacegun();
    return createShot.apply(this, [function (shot) { 
      shot.characteristics.movable.speed.x = 0; 
      shot.characteristics.movable.speed.y = -this.characteristics.cube.defaultShotSpeed;
    }]);
  }

  function shootDown() {
    SC.audio.spacegun();
    return createShot.apply(this, [function (shot) { 
      shot.characteristics.movable.speed.x = 0; 
      shot.characteristics.movable.speed.y = this.characteristics.cube.defaultShotSpeed;
    }]);
  }

  function draw(context) {
    context.strokeRect(
      this.characteristics.movable.position.x,
      this.characteristics.movable.position.y,
      this.characteristics.movable.width,
      this.characteristics.movable.height
    );
    
    context.fillText(
      this.characteristics.cube.name,
      this.characteristics.movable.position.x,
      this.characteristics.movable.position.y + this.characteristics.movable.height + 10
    );

    context.fillRect(
      this.characteristics.movable.position.x + 
        (this.characteristics.movable.width - SC.shot.original.width)/2,
      this.characteristics.movable.position.y +
        (this.characteristics.movable.height - SC.shot.original.height)/2,
      SC.shot.original.width,
      SC.shot.original.height
    );
  }

  return function (worldObject) {
    movable.makeItMovable(worldObject);
    worldObject.characteristics.movable.boundaryCheck = true;
    worldObject.addCharacteristicProperties('cube', SC.cube.original);

    worldObject.characteristics.movable.width = worldObject.characteristics.cube.width;
    worldObject.characteristics.movable.height = worldObject.characteristics.cube.height;
    worldObject.rightPressed = rightPressed;
    worldObject.leftPressed = leftPressed;
    worldObject.upPressed = upPressed;
    worldObject.downPressed = downPressed;
    worldObject.shootLeft = shootLeft;
    worldObject.shootRight = shootRight;
    worldObject.shootUp = shootUp;
    worldObject.shootDown = shootDown;
    worldObject.draw = draw;
  };
}());

SC.cube.applyTo = SC.cube.makeItACube;
