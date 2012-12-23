describe('movable', function() {
  
  it('World object can become Moveable', function() {
    var o = new core.WorldObject();
    expect(_.contains(_.keys(o.characteristics),'movable')).toEqual(false);
    movable.makeItMovable(o);
    expect(_.contains(_.keys(o.characteristics),'movable')).toEqual(true);
  });
  
  it('movable moves when object update is called', function() {
    var o = new core.WorldObject();
    spyOn(movable,'move').andCallThrough();
    movable.makeItMovable(o);
    o.update(200);
    expect(movable.move).toHaveBeenCalled();
  });

  describe('boundary check on', function () {
    it('does not move outside the boundaries', function () {
      var o = new core.WorldObject();
      movable.makeItMovable(o);

      o.characteristics.movable.boundaryCheck = true;
      o.characteristics.movable.speed.x = 1000;
      o.characteristics.movable.speed.y = 2000;

      o.update(200000);

      expect(o.characteristics.movable.position.x).toBe(0);
      expect(o.characteristics.movable.position.y).toBe(0);
    });
  });

  describe('boundary check off', function () {
    it('does move outside the boundaries', function () {
      var o = new core.WorldObject();
      movable.makeItMovable(o);

      o.characteristics.movable.boundaryCheck = false;
      o.characteristics.movable.speed.x = 1000;
      o.characteristics.movable.speed.y = 2000;

      o.update(200000);

      expect(o.characteristics.movable.position.x).not.toBe(0);
      expect(o.characteristics.movable.position.y).not.toBe(0);
    });
  });

  
  it('Movable direction is being set.',function(){
    var o = new core.WorldObject();
    movable.makeItMovable(o);   
  });
});
