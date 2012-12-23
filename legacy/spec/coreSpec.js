describe("Core", function() {

  it("Time of last update on a world object is correcly updated", function() {
	var o = new core.WorldObject();
	o.actions.push(function(obj,elapsedTime){});
    expect(o.lastUpdate).toEqual(0);
	o.update(300);
    expect(o.lastUpdate).toEqual(300);
	o.update(100);
    expect(o.lastUpdate).toEqual(400);	
  });

  it("Action function is called on root object with proper arguments", function() {
	var o = new core.WorldObject();
	o.actions.push(function(obj,elapsedTime){});
	spyOn(o,'run');
	o.update(100);
	expect(o.run).toHaveBeenCalledWith(o,100);
  });

  it("Action function is called on deeper objects with the correct parameters", function() {
	var o = new core.WorldObject();
	var o2 = new core.WorldObject();			
	o.actions.push(function(obj,elapsedTime){});
	//o2.actions.push(function(obj,elapsedTime){});	
	o2.actions.push(o);		
	spyOn(o,'run');
	o2.update(100);
	expect(o.run).toHaveBeenCalledWith(o,100);
  });

	it("World object is able to detect his own characteristic", function() {
		var o = new core.WorldObject();
		expect(o.hasCharacteristic("chara")).toEqual(false);
		o.characteristics["chara"]=0;
		expect(o.hasCharacteristic("chara")).toEqual(true);
	});

	it("Characteristic can be added to a world object", function() {
		var o = new core.WorldObject();
		var properties={color:"black",size:10};
		expect(_.contains(_.keys(o.characteristics),"newStuff")).toEqual(false);
		o.addCharacteristicProperties("newStuff", properties);
		expect(_.contains(_.keys(o.characteristics),"newStuff")).toEqual(true);
	});

	it("Characteristic can not be added to a world object that already has that characteristic", function() {
		var o = new core.WorldObject();
		var properties={color:"black",size:10};
		o.addCharacteristicProperties("newStuff", properties);
		var sizeBeforeSecondAdd = _.size(o.characteristics);
		o.addCharacteristicProperties("newStuff", properties);
		var sizeAfterSecoundAdd = _.size(o.characteristics);
		expect(sizeBeforeSecondAdd).toEqual(sizeAfterSecoundAdd);
	});	
		
});