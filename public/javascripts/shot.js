var SC = SC || {};
SC.shot = SC.shot || {};

SC.shot.original = {
  width: 30,
  height: 30
};

(function () {
  function draw(context) {
    context.strokeRect(
      this.characteristics.movable.position.x,
      this.characteristics.movable.position.y,
      this.characteristics.movable.width,
      this.characteristics.movable.height
    );
  }

  SC.shot.makeItAShot = function (worldObject) {
    movable.makeItMovable(worldObject);
    worldObject.addCharacteristicProperties('shot', SC.shot.original);

    worldObject.characteristics.movable.width = worldObject.characteristics.shot.width;
    worldObject.characteristics.movable.height = worldObject.characteristics.shot.height;

    worldObject.draw = draw;
  };
}());

SC.shot.applyTo = SC.shot.makeItAShot;
