var util = require ('util');
var exec = require ('child_process').exec;
var ms = require ('./ms.js')

var runCommand = {
  "c": "./main",
  "c++": "./main",
  "python": "python %s",
  "python3": "python3 %s"
}

exports.diff = function (userOutput, programOutput){
  if (userOutput == programOutput){
    return true;
  }
  else {
    return false;
  }
}


exports.run = function (filename, language, input){
  var command = '';

  if (runCommand[language].indexOf('%s') != -1){
    command = util.format(runCommand[language], filename);
  }
  else {
    command = runCommand[language];
  }

  command += ' < ' + input;

  var begin = Date.now();
  return new Promise ((resolve, reject) => {
    exec (command, function (_err, _stdout, _stderr){

      var _status = 'ok';
      if (_err) _status = 'error';

      var end = Date.now();
      var _time = ms.format (end-begin);
      
      resolve ({
        status: _status,
        err: _err,
        stdout: _stdout,
        stderr: _stderr,
        time: _time
      });
      
    });
  });

}
