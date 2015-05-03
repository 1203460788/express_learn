var exec = require('cordova/exec');
var myEcho = function(){};
myEcho.prototype.Echo=function(sucessCallback, errorCallback,content,type){
    exec(sucessCallback, errorCallback, "Echo", "echo", [content,type]);
};

var echo = new myEcho();
module.exports = echo;