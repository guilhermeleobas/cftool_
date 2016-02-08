#!/usr/bin/env node

"use strict";

var fs = require ('fs');
var commander = require ('commander');
var fetch = require ('./fetchAndParse.js');
var compile = require ('./compile.js');
var run = require ('./run.js');
var path = require ('path');
const chalk = require ('chalk');
var execSync = require ('child_process').execSync;
var format = require ('./format');


function compileCode (file, language){
  return compile.compile (file, language);
}

function loadInputsAndOutputs (problem){
  return new Promise ((resolve, reject) =>{
    let data;
    try{
      data = execSync ('ls ' + problem).toString().split('\n');
    }
    catch (err) {
      reject (new Error ('run \'cftool get ' + problem + '\' first'));
    }
    let ret = {in: [], out: []};
  
    for (let i in data){
      if (data[i] === '') continue;
      else if (data[i].indexOf('in') === -1){
        ret.out.push (problem + '/' + data[i]);
      }
      else {
        ret.in.push (problem + '/' + data[i]); 
      }
    }
    
    resolve (ret);
  });
}

function exec (filename, language, testCase, input, correctOutput){
  let userOutput;

  run.run (filename, language, input)
  .then (function (_userOutput){
    userOutput = _userOutput;
    return format.diff (userOutput, correctOutput);
  }).then (function (diffStatus){
    return format.formatOutput (userOutput, correctOutput, testCase, diffStatus);
  }).then (function (formatedOutput){
    console.log (formatedOutput);
    return formatedOutput;
  }).catch (console.log.bind (console));
}

function runCode (filename, language, inputs, outputs){
  let lastPromise = inputs.reduce (function (promise, input, index){
    return Promise.resolve().then (function (){
      let output = fs.readFileSync (outputs[index], 'utf8');
      return exec (filename, language, index, input, output);
    });
  }, Promise.resolve());
}

commander
.version('1.2.1');

commander
.command ('get <number>')
.description('Get input/output for a problem or contest')
.action (function (number){
  fetch.fetch(number);
});

commander
.command ('compile <file>')
.option ('-l, --language <language>', 'Specify a language to be used instead of the default value')
.description ('compile your code')
.action (function (filename, options){
  let language = options.language || compile.detect (filename);
  compileCode (filename, language);
});

commander
.command ('test <file> <problem>')
.description ('Test your code with some input')
.option ('-l, --language <language>', 'Specify a language to be used instead of the default value')
.action (function (filename, problem, options){
  let language = options.language || compile.detect (filename);
  compileCode (filename, language)
  .then (function (data){
    if (data.status === "not required"){
      console.log ('Compile: ' + chalk.green ('pass'));
    }
    else if (data.status === "error"){
      console.log ('Compile: ' + chalk.red ('fail'));
    }
    else if (data.status === "ok"){
      console.log ('Compile: ' + chalk.green ('ok'));
    }
    console.log();
    return loadInputsAndOutputs(problem);
  })
  .then (function (data){
    return runCode (filename, language, data.in, data.out);
  })
  .catch (console.log.bind (console));
});

commander
.parse (process.argv);
