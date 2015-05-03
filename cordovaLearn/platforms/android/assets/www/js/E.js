function Event(){
	if(!(this instanceof Event)){
		return new Event();
	}
	this.event={};
}

Event.prototype.on=function(type,callback){
	if(!this.event){
		this.event={};
	}
	var event=this.event;
	if(!(event[type] instanceof Array)){
		event[type]=[];
	}
	if((event[type] instanceof Array)&&event[type].length){
		for(var i=0;i<event[type].length;i++){
			if(event[type][i]==callback){
				return this;
			}
		}
	}
	
	event[type].push(callback);
	return this;
}
Event.prototype.emit=function(type,callback){
	var event=this.event
	if(event&&event[type].length){
		if(callback){
			for(var i=0;i<event[type].length;i++){
				if(event[type][i]==callback){
					this.event[type][i].call(this);
					break;
				}
			}
		}else{
			for(var i=0;i<event[type].length;i++){
				this.event[type][i].call(this);
			}
		}
	}
	return this;
}
Event.prototype.off=function(type,callback){
	if(type&&this.event&&this.event[type]){
		var event=this.event;
		for(var i=0;i<event[type].length;){
			if(event[type][i]==callback){
				event[type].splice(i,1);
				break;
			}else{
				i++
			}
		}
	}else{
		this.event={};
	}
	return this;
}