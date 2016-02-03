var exec = require ('child_process').exec;
var child_process = require ('child_process');
var util = require ('util');
var chalk = require ('chalk');


var NO_COMPILE = "no compile command";

var mapLanguages = {
  "c": "c",
  "cpp": "c++",
  "cc": "c++",
  "py": "python",
  "java": "java",
  "": ""
}

// to-do check what flags codeforces uses
var compileCommand = {
  "c": "gcc %s -o main",
  "c++": "g++ %s -o main",
  "c++11": "g++ -std=c++11 %s -o main",
  "python": "",
  "python3": ""
}

exports.detect = function (filename){
  var ending = filename.split('.').slice(-1)[0];
  if (mapLanguages[ending] != undefined)
    return mapLanguages[ending]
  else
    return mapLanguages[""]
}

exports.compile = function (filename, language, callback){

  return new Promise ((resolve, reject) => {
    if (language == null){
      language = this.detect (filename);
    }

    if (language != ""){
      var command = compileCommand[language];
      if (command == ""){
        console.log ('Compile: ' + chalk.green ('pass'))
        resolve ( {
          status: "not required",
          exec: filename,
          err: null,
          stdout: null,
          stderr: null
        })
      }
      else {
        command = util.format (command, filename);
        child_process.exec (command, function (_err, _stdout, _stderr){
          var _status = null;
          if (_err){
            console.log ('Compile: ' + chalk.red ('fail'));
            reject ({
              status: 'error',
              err: _err,
              stdout: _stdout,
              stderr: _stderr,
              exec: 'main'
            })
          }
          else {
            console.log ('Compile: ' + chalk.green ('ok'));
            resolve ({
              status: 'ok', 
              err: _err,
              stdout: _stdout,
              stderr: _stderr,
              exec: 'main'
            })
          }
        })
      }
    }
    else {
      console.log ('Compile: ' + chalk.red ('fail! Language not detected'));
      reject ({
        status: 'error',
        err: new Error ("Could not detect language used with the file specified"),
        stdout: null,
        stderr: null,
        exec: null
      })
    }
  })
}
