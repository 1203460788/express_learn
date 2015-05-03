
// JavaScript Document
function typeDate(date){
	return Object.prototype.toString.call(date);
}


function on(ele,type,handler){
	if(typeof ele['on'+type]=='undefined'){	
		if(!(ele['ab'+type] instanceof Array)){
			ele['ab'+type]=[];
		}
		var a=ele['ab'+type];
		for(var i=0;i<a.length;i++){
		
			if(a[i]==handler){
				return ;
			}
		}
		a.push(handler);
	}else if(ele.addEventListener){
		ele.addEventListener(type,handler,false);
	}else if(ele.attachEvent){
		if(!(ele['abc'+type] instanceof Array)){
			ele['abc'+type]=[];
		}
		var a=ele['abc'+type];
		for(var i=0;i<a.length;i++){
			if(a[i]===handler) return;
		}
		a.push(handler);

		if(typeof ele['a'+type]=='undefined'){
			ele['a'+type]=function(){fire.call(ele)};
			ele.attachEvent("on"+type,ele['a'+type]);
		}
	}
}
function off(ele,type,handler){
	if(ele.removeEventListener){
		ele.removeEventListener(type,handler,false);
	}else if(ele.detachEvent){
		var a=ele['abc'+type];
		if(a)
		/*for(var i=0;i<a.length;i++){
			if(a[i]==handler){
				a[i]=null;
			}
		}*/
		for(var i=0;i<a.length;){
			if(a[i]==handler){
				a.splice(i,1)
			}else{
				i++;
			}
		}
	}
	
}
function runMyselfDefine(type,e){
		var a=this['ab'+type];
		if(a)
		for(var i=0;i<a.length;i++){
			a[i].call(this,type,e);
		}
}
function fire(){
	var e=window.event;
	if(typeof e.pageX=='undefined'){
		e.pageX=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
		e.pageY=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)
	}
	if(typeof e.target=='undefined'){
		e.target=e.srcElement;
	}
	if(!e.stopPropagation){
		e.stopPropagation=function(){
			e.cancelBubble=true;
		}
	}
	if(!e.preventDefault){
		e.preventDefault=function(){
			e.returnValue=false;
		}

	}
	var type=e.type;
	var a=this['abc'+type];
	for(var i=0;i<a.length;i++){
		if(a[i])
		a[i].call(this,e);
	}	
}