describe('cube', function () {
  var cube;

  beforeEach(function () {
    cube = new core.WorldObject();
    SC.cube.makeItACube(cube);
  });

  it('changes its direction when direction key is pressed', function () {
    var speed = cube.characteristics.cube.defaultSpeed;

    cube.leftPressed();

    expect(cube.characteristics.movable.speed.x).toBe(-speed);
    expect(cube.characteristics.movable.speed.y).toBe(0);

    cube.rightPressed();

    expect(cube.characteristics.movable.speed.x).toBe(speed);
    expect(cube.characteristics.movable.speed.y).toBe(0);

    cube.upPressed();

    expect(cube.characteristics.movable.speed.x).toBe(0);
    expect(cube.characteristics.movable.speed.y).toBe(-speed);

    cube.downPressed();

    expect(cube.characteristics.movable.speed.x).toBe(0);
    expect(cube.characteristics.movable.speed.y).toBe(speed);
  });
});
