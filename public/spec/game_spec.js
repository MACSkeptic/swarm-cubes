describe('game', function () {
  beforeEach(function () {
    SC.game.init();
  });


  it('has a movable cube', function () {
    var cube = _.find(SC.world.objects, function (entity) {
      return entity;
    });

    expect(cube).toBeTruthy();
    expect(cube.hasCharacteristic('movable')).toBeTruthy();
  });
});
