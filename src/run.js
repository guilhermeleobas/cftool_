var util = require ('util');
var exec = require ('child_process').exec;
var ms = require ('./ms.js')

var runCommand = {
  "c": "./main",
  "c++": "./main",
  "python": "python %s",
  "python3": "python3 %s"
}


exports.run = function (program, language, input, callback){
  var command = '';
  
  if (runCommand[language].indexOf('%s') != -1){
    command = util.format(runCommand[language], program);
  }
  else {
    command = runCommand[language];
  }
  
  command += ' < ' + input;
  
  var begin = Date.now();
  exec (command, function (_err, _stdout, _stderr){
    
        var _status = 'ok';
        if (_err) _status = 'error';
        
        var end = Date.now();
        var _time = ms.format (end-begin);
        callback ({
          status: _status,
          err: _err,
          stdout: _stdout,
          stderr: _stderr,
          time: _time
        })     
        
  })
  
}
