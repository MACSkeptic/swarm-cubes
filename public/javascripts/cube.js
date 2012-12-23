var SC = SC || {};
SC.cube = SC.cube || {};

SC.cube.original = {
  defaultSpeed: 100,
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

  return function (worldObject) {
    movable.makeItMovable(worldObject);
    worldObject.addCharacteristicProperties("cube", SC.cube.original);
    worldObject.rightPressed = rightPressed;
    worldObject.leftPressed = leftPressed;
    worldObject.upPressed = upPressed;
    worldObject.downPressed = downPressed;
  };
}());
