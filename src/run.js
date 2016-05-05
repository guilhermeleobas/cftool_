"use strict";

var util = require ('util');
var child_process = require ('child_process');
var ms = require ('./ms.js');
var Promise = require ('bluebird');
var fs = require('fs');

var runCommand = {
  "c": "./main",
  "c++": "./main",
  "python": "python %s",
  "node": "node -e \"" + fs.readFileSync(__dirname + "/wrapper.js").toString().replace("\n","").replace("\\","\\\\") + ";require('./%s')\"",
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

  if (runCommand[language].indexOf('%s') !== -1){
    command = util.format(runCommand[language], filename);
  }
  else {
    command = runCommand[language];
  }

  command += ' < ' + input;

  var begin = Date.now();

  return new Promise (function (resolve, reject) {
    return child_process.exec (command, function (_err, _stdout, _stderr){

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
