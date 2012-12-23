describe("Movable", function() {
	
	it("World object can become Moveable", function() {
		var o = new core.WorldObject();
		expect(_.contains(_.keys(o.characteristics),"movable")).toEqual(false);
		movable.makeItMovable(o);
		expect(_.contains(_.keys(o.characteristics),"movable")).toEqual(true);
	});
	
	it("Movable moves when object update is called", function() {
		var o = new core.WorldObject();
		spyOn(movable,'move').andCallThrough();
		movable.makeItMovable(o);
		o.update(200);
		expect(movable.move).toHaveBeenCalled();
	});
	
	it("Movable direction is being set.",function(){
		var o = new core.WorldObject();
		movable.makeItMovable(o);		
	});
});