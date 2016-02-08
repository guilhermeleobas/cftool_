

var ms =         1;
var s  = 1000 * ms; 
var m  =    60 * s;
var h  =    60 * m;

/*
 * format a number
 * val => a number representing time elapsed
 */
exports.format = function (val){
  
  val = Math.round(val);
  
  if (val >= h){
    return Math.round(val / h) + 'h';
  }
  else if (val >= m){
    return Math.round(val / m) + 'm';
  }
  else if (val >= s){
    return Math.round(val / s) + 's';
  }
  else {
    return Math.round(val) + 'ms';
  }
}
