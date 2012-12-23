var movable = movable || {};

movable.original={
	position: {
		x:0,
		y:0
	},
	speed: {
		x:0,
		y:0
	},
	toDirection : function(x,y){
		var speedVector = $V([this.speed.x,this.speed.y,0]);
		var destinationVector = $V([x-this.position.x,y-this.position.y,0]);
		var normalLine = Line.create([0,0,0],[0,0,1]);
		var angle = speedVector.angleFrom(destinationVector);
		var turnDirection = speedVector.cross(destinationVector);
		if (turnDirection.elements[2] < 0) {
			angle = Math.PI*2 - angle;
		}
		var rotatedSpeed = speedVector.rotate(angle,normalLine);
		this.speed.x=rotatedSpeed.elements[0];
		this.speed.y=rotatedSpeed.elements[1];
		return this;
	},
	atSpeed : function(speed){
		return this;
	}
};

//speed shall be in pixel per second

movable.makeItMovable = function(worldObject){
	worldObject.addCharacteristicProperties("movable",movable.original);
	worldObject.characteristics.movable.speed = {x:0,y:0};
	worldObject.characteristics.movable.position = {x:0,y:0};
	worldObject.actions.push(movable.move);
}

movable.move = function(movable,elapsedTime){
	movable.characteristics.movable.position.x += movable.characteristics.movable.speed.x*(elapsedTime/1000);
	movable.characteristics.movable.position.y += movable.characteristics.movable.speed.y*(elapsedTime/1000);
}
