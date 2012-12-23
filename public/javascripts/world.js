var SC = SC || {};
SC.world = SC.world || {};

SC.world.width = 800;
SC.world.height = 600;
SC.world.objects = [];

SC.world.isOutside = function (worldObject) {
  return worldObject.characteristics.movable.position.x > SC.world.width ||
    worldObject.characteristics.movable.position.x < 0 ||
    worldObject.characteristics.movable.position.y > SC.world.height ||
    worldObject.characteristics.movable.position.y < 0;
};

SC.world.isInside = function (worldObject) {
  return !SC.world.isOutside(worldObject);
};

SC.world.clearObjects = function () {
  SC.world.objects = _.filter(SC.world.objects, SC.world.isInside);
};
