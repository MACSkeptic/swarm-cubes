describe('cube', function () {
  var cube;

  beforeEach(function () {
    cube = new core.WorldObject();
    SC.cube.makeItACube(cube);
  });

  it('has default speed and default dimension', function () {
    expect(cube.characteristics.cube.defaultSpeed).toBe(100);
    expect(cube.characteristics.cube.width).toBe(50);
    expect(cube.characteristics.cube.height).toBe(50);
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
