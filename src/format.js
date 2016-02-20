"use strict";

var chalk = require ('chalk');

var red = 'red';
var green = 'green';
var gray = 'gray';

var sep = '-~-'
var endl = '\n';

exports.formatLines = function (lines){
  let aux = lines.split ('\n');

  if (aux.length > 1){
    aux.splice(-1, 1);
    aux = aux.join(endl);
  }

  return aux + '\n';
};

exports.diff = function (userOutput, correctOutput){
  return userOutput.stdout === correctOutput;
};

// @color => Indicates whether if cftool should use colors or not
exports.formatOutput = function (userOutput, correctOutput, testCase, diffStatus, useColors){

  function colorFormat (str, color, useColors){
    if (useColors === false)
      return str;
    else
      return chalk.styles[color].open + str + chalk.styles[color].close;
  }

  let s = "## Test #" + testCase + endl;

  if (userOutput.status === 'err'){
    s += colorFormat ("error", red, useColors) + endl;
    s += userOutput.err;
  }
  else {
  
    let co = exports.formatLines (correctOutput);
    let uo = exports.formatLines (userOutput.stdout);

    if (diffStatus === false){
      s += colorFormat ("Wrong answer - " + userOutput.time, red, useColors) + endl;
      s += colorFormat ("+ expected", green, useColors) + ' ' + colorFormat (" - actual", red, useColors) + endl;
      s += sep + endl;
      s += colorFormat (co, green, useColors);
      s += sep + endl;
      s += colorFormat (uo, red, useColors);
      s += sep + endl;
    }
    else {
      s += colorFormat ("Accepted - " + userOutput.time, green, useColors) + endl;
      s += sep + endl;
      s += colorFormat (uo, gray, useColors);
      s += sep + endl;
    }

  }

  return s;
};