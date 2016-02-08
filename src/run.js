"use strict";

var util = require ('util');
var exec = require ('child_process').exec;
var ms = require ('./ms.js');


var runCommand = {
  "c": "./main",
  "c++": "./main",
  "python": "python %s",
  "python3": "python3 %s"
};

var ret = {
  status: undefined,
  err: undefined,
  stdout: undefined,
  stderr: undefined,
  time: undefined
};

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

      if (_err) ret.status = 'error';
      else ret.status = 'ok';

      var end = Date.now();
      var _time = ms.format (end-begin);
      
      ret.time = _time;
      ret.err = _err;
      ret.stdout = _stdout;
      ret.stderr = _stderr;
      resolve (ret);
      
    });
  });

};
