var child_process = require ('child_process');

exports.ls = function (callback){
  return child_process.execSync('ls').toString().split('\n');
}
