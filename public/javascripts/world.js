var SC = SC || {};
SC.world = SC.world || {};

SC.world.width = 800;
SC.world.height = 600;
SC.world.objects = [];

SC.world.isOutside = function (worldObject) {
  return SC.world.isPositionOutside(
    worldObject.characteristics.movable.position.x,
    worldObject.characteristics.movable.position.y
  );
};

SC.world.isPositionOutside = function (x, y) {
  return x > SC.world.width || x < 0 ||
    y > SC.world.height || y < 0;
};

SC.world.isInside = function (worldObject) {
  return !SC.world.isOutside(worldObject);
};

SC.world.clearObjects = function () {
  SC.world.objects = _.filter(SC.world.objects, SC.world.isInside);
};
