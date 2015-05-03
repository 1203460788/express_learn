var exec = require('cordova/exec');
var myToast = function(){};
myToast.prototype.show=function(content,type){
	alert("show")
    exec(null, null, "webToast", "show", [content,type]);
};
myToast.prototype.openVideo=function(content){
    exec(null, null, "webToast", "openVideo", [content]);
};
var showt = new myToast();
module.exports = showt;