cordova.define("com.korewang.cordova.myKitty.myKitty", function(require, exports, module) { var myKitty = function() {};  
   
myKitty.prototype.name = function() {  
    alert("Kitty && Kitty");  
};  
   
var mykitty = new myKitty();  
module.exports = mykitty;
});
