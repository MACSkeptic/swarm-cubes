var SC = SC || {};
SC.cube = SC.cube || {};

SC.cube.original = {
  defaultSpeed: 100,
  defaultShotSpeed: 200,
  shots: [],
  width: 50,
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
    movable.makeItMovable(shot);
    shot.characteristics.movable.position.x = this.characteristics.movable.position.x;
    shot.characteristics.movable.position.y = this.characteristics.movable.position.y;
    customize.apply(this, [shot]);
    this.characteristics.cube.shots.push(shot);
    return shot;
  }

  function shootLeft() {
    return createShot.apply(this, [function (shot) { 
      shot.characteristics.movable.speed.x = -this.characteristics.cube.defaultShotSpeed;
      shot.characteristics.movable.speed.y = 0;
    }]);
  }

  function shootRight() {
    return createShot.apply(this, [function (shot) { 
      shot.characteristics.movable.speed.x = this.characteristics.cube.defaultShotSpeed;
      shot.characteristics.movable.speed.y = 0;
    }]);
  }

  function shootUp() {
    return createShot.apply(this, [function (shot) { 
      shot.characteristics.movable.speed.x = 0; 
      shot.characteristics.movable.speed.y = -this.characteristics.cube.defaultShotSpeed;
    }]);
  }

  function shootDown() {
    return createShot.apply(this, [function (shot) { 
      shot.characteristics.movable.speed.x = 0; 
      shot.characteristics.movable.speed.y = this.characteristics.cube.defaultShotSpeed;
    }]);
  }

  return function (worldObject) {
    movable.makeItMovable(worldObject);
    worldObject.addCharacteristicProperties('cube', SC.cube.original);
    worldObject.rightPressed = rightPressed;
    worldObject.leftPressed = leftPressed;
    worldObject.upPressed = upPressed;
    worldObject.downPressed = downPressed;
    worldObject.shootLeft = shootLeft;
    worldObject.shootRight = shootRight;
    worldObject.shootUp = shootUp;
    worldObject.shootDown = shootDown;
  };
}());
