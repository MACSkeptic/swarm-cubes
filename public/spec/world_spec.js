describe('world', function () {
  beforeEach(function () {
    SC.world.objects = [];
  });

  it('knows the logical width and height of the game', function () {
    expect(SC.world.width).toBeTruthy();
    expect(SC.world.height).toBeTruthy();
  });

  it('has a list of objects', function () {
    expect(SC.world.objects).toEqual([]);
  });

  it('can detect off world objects', function () {
    var cube = core.WorldObject();
    movable.makeItMovable(cube);

    cube.characteristics.movable.position.x = 2000;
    cube.characteristics.movable.position.y = 2000;

    expect(SC.world.isOutside(cube)).toBeTruthy();

    cube.characteristics.movable.position.x = -10;
    cube.characteristics.movable.position.y = -10;

    expect(SC.world.isOutside(cube)).toBeTruthy();

    cube.characteristics.movable.position.x = 200;
    cube.characteristics.movable.position.y = 200;

    expect(SC.world.isOutside(cube)).toBeFalsy();
  });

  it('clears out world objects that are outside', function () {
    var cube1 = core.WorldObject();
    movable.makeItMovable(cube1);
    cube1.characteristics.movable.position.x = -10;
    cube1.characteristics.movable.position.y = -10;

    var cube2 = core.WorldObject();
    movable.makeItMovable(cube2);
    cube2.characteristics.movable.position.x = 200;
    cube2.characteristics.movable.position.y = 200;

    SC.world.objects.push(cube1);
    SC.world.objects.push(cube2);

    SC.world.clearObjects();

    expect(_.find(SC.world.objects, function (o) { return o === cube2; })).toBeTruthy();
    expect(_.find(SC.world.objects, function (o) { return o === cube1; })).toBeFalsy();
  });
});
