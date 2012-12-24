var collision = collision || {};

collision.areColliding = function (movable1, movable2) {
  var x1 = movable1.characteristics.movable.position.x;
  var x2 = movable2.characteristics.movable.position.x;

  var y1 = movable1.characteristics.movable.position.y;
  var y2 = movable2.characteristics.movable.position.y;

  var size1 = movable1.characteristics.movable.width/2;
  var size2 = movable2.characteristics.movable.width/2;

  var bottom1, bottom2, left1, left2, right1, right2, top1, top2;
  left1 = x1 - size1;
  right1 = x1 + size1;
  top1 = y1 - size1;
  bottom1 = y1 + size1;
  left2 = x2 - size2;
  right2 = x2 + size2;
  top2 = y2 - size2;
  bottom2 = y2 + size2;
  return !(left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1);
};

