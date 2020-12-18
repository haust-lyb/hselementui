/**js增加方法**/
String.prototype.contains = function(str){
    return this.indexOf(str)==-1?false:true
}
