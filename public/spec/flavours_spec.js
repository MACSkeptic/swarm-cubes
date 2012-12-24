describe('object factory', function () {
  it('re-constructs the object', function () {
    var cube = new SC.core.WorldObject();
    SC.cube.makeItACube(cube);

    cube.characteristics.movable.position.x = 4;
    cube.characteristics.movable.position.y = 2;

    var json = JSON.stringify(cube);

    var newCube = SC.objectFactory(json);

    expect(newCube.characteristics.movable.position.x).toBe(4);
    expect(newCube.characteristics.movable.position.y).toBe(2);
  });
});
