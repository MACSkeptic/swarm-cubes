var core = core || {};

core.log= function(msg) {
	console.log(msg);
}

core.newObject = function (proto){
	function F() {};
    F.prototype = proto;
    var f = new F();
    return f;
}

core.WorldObject = function(){
	function self() {
		this.lastUpdate = 0;
		this.actions = [];
		this.characteristics = {};
	};
	//do stuff with prototype here.
	self.prototype.run = function(obj,elapsedTime) {
		_.each(this.actions, function(action) { 
			if(_.isFunction(action)){
				action(obj,elapsedTime);
			}else{
				action.run(action,elapsedTime);
			}
			;});
			this.lastUpdate = this.lastUpdate+elapsedTime;
	};

	self.prototype.update = function(elapsedTime){
		this.run(this,elapsedTime);
	}	

	self.prototype.hasCharacteristic = function(characteristic){
		return _.contains(_.keys(this.characteristics),characteristic);
	}

	self.prototype.addCharacteristicProperties = function(characteristic, properties){
		if(!this.hasCharacteristic(characteristic) ){
			this.characteristics[characteristic]=core.newObject(properties);
		}
	}
	
	return new self();
}