"use strict";

var chalk = require ('chalk');

var indent = "      ";

function indentOutput (line){
  return indent + line;
}

exports.formatLines = function (lines){
  let aux = lines.split ('\n').map(indentOutput);

  if (aux.length > 1){
    aux.splice(-1, 1);
  }

  return aux.length > 1 ? aux.join('\n') : aux + '\n';
};

exports.diff = function (userOutput, correctOutput){
  return userOutput.stdout === correctOutput;
};

exports.formatOutput = function (userOutput, correctOutput, testCase, diffStatus){
  let s = "  Test #" + testCase + '\n' + '\n';

  if (userOutput.status === 'err'){
    s += indent + chalk.red ("error") + '\n';
    s += userOutput.err;
  }
  else {
  
    let co = exports.formatLines (correctOutput);
    let uo = exports.formatLines (userOutput.stdout);

    // let co = correctOutput.split ('\n').map (indentOutput);
    // co.splice (-1, 1).join ('\n');

    // let uo = userOutput.stdout.split ('\n').map(indentOutput);
    // uo.splice (-1, 1).join('\n');

    if (diffStatus === false){
      s += indent + chalk.red ("Wrong answer - " + userOutput.time) + '\n';
      s += indent  + chalk.green ("+ expected") + ' ' + chalk.red (" - actual") + '\n\n';
      s += chalk.green (co) + '\n';
      s += chalk.red (uo) + '\n';
    }
    else {
      s += indent + chalk.green ("Accepted - " + userOutput.time) + '\n';
      s += chalk.gray (uo) + '\n';
    }

  }

  return s;
};