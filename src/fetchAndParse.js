"use strict";

var request = require ('request');
var cheerio = require ('cheerio');
var child_process = require ('child_process');
var writeToDisk = require ('./writeToDisk.js');
var path = require ('path');

var CONTESTLINK = 'http://codeforces.com/contest'
var INPUT = 'input'
var OUTPUT = 'output'

exports.getHTML = function (url){
  return new Promise ((resolve, reject) =>
    request (url, function (err, response, html){
      if (response.statusCode != 200){
        reject (new Error ("Bad URL"));
      }
      else if (err){
        reject (err);
      }
      else {
        resolve (html);
      }
    })
  )
}

exports.loadHTML = function (html){
  return cheerio.load(html);
}

// type must be 'input' or 'output'
exports.parser = function ($, type){
  var length = $('div.sample-test').children('div.' + type).children('pre').length
  var data = [];
  for (var i=0; i<length; i++){
    var aux = $('div.sample-test').children('div.' + type).children('pre').eq(i).html();
    aux = aux.split ('&lt;').join('<');
    aux = aux.split ('&gt;').join('>');
    
    if (aux.indexOf ("<br>") === -1){
      aux += "<br>";
    }
    aux = aux.replace(/<br\s*\/?>/mg,"\n");
    
    data.push(aux);
  }

  return data;
}

exports.parseContest = function ($){
  var length = $('td.id').length;
  var links = [];
  for (var i=0; i<length; i++){
    var aux = $('td.id').children('a').eq(i).attr('href');
    aux = 'http://codeforces.com' + aux;
    links.push (aux);
  }
  return links;
}

exports.getInput = function ($){
  return exports.parser ($, INPUT);
}

exports.getOutput = function ($){
  return exports.parser ($, OUTPUT);
}

exports.checkArraySize = function (data){
  if (data[0].length == data[1].length) return data;
  else return new Error ("error");
}

exports.getContestNumberAndProblem = function (url){
  url.replace ('http://', '');
  var regex = "codeforces.com\/contest\/(.*)\/problem\/(.*)"
  var aux = url.match (regex);
  return aux.slice(1);
}

exports.getContestNumber = function (url){
  return exports.getContestNumberAndProblem(url)[0];
}

exports.getProblemLetter = function (url){
  return exports.getContestNumberAndProblem(url)[1];
}

function printDownload (contest, problem, filesArray){

  console.log (contest + problem + '/');

  for (let i = 0; i <filesArray.in.length; i++){
    console.log ("├╴ "+ filesArray.in[i]);
  }

  for (let i = 0; i < filesArray.out.length; i++){
    if (i + 1 === filesArray.out.length){
      console.log ("└╴ " + filesArray.out[i]);
    }
    else {
      console.log ("├╴ " + filesArray.out[i]);
    }
  }
  
  console.log ('');
}

/*
  * 
*/
function formatFilenames (filesArray){
  let currentDir = process.cwd();
  let _ret = {in: [], out: []};

  for (let i in filesArray.in){
    let dir = path.relative (currentDir, path.parse (filesArray.in[i]).dir);
    let file = path.parse (filesArray.in[i]).base;
    _ret.in.push (file);
  }

  for (let i in filesArray.out){
    let dir = path.relative (currentDir, path.parse (filesArray.out[i]).dir);
    let file = path.parse (filesArray.out[i]).base;
    _ret.out.push (file);
  }

  return _ret;
}

exports.fetchProblem = function (problemUrl){

  let inputs = [];
  let outputs = [];
  let contest, problem;
  let url = problemUrl;

  exports.getHTML (url)
  .then (function (html){
    return exports.loadHTML(html);
  })
  .then (function ($){
    inputs = exports.getInput ($);
    outputs = exports.getOutput ($);
    return [inputs, outputs];
  })
  .then (function (data){
    return exports.checkArraySize(data);
  })
  .then (function (data){
    contest = exports.getContestNumber(url);
    problem = exports.getProblemLetter(url);
    return writeToDisk (data[0], data[1], contest, problem);
  })
  .then (function (filesArray){
    return formatFilenames (filesArray);
  })
  .then (function (filesArray){
    return printDownload(contest, problem, filesArray);
  })
  .catch (console.log.bind (console));
}

exports.fetchContest = function (contestUrl){

  let url = contestUrl;

  exports.getHTML(url)
  .then(function(html){
    return exports.loadHTML(html);
  })
  .then(function ($){
    return exports.parseContest($);
  })
  .then(function (links){
    links.forEach(exports.fetchProblem);
  });
}

function formatUrl (contest, problem){
  if (problem !== ''){
    return 'http://codeforces.com/contest/' + contest + '/problem/' + problem;
  }
  else {
    return 'http://codeforces.com/contest/' + contest;
  }
}

exports.fetch = function (number){
  let result = number.match (/(\d{1,3})(\D*)/);
  let contest = result[1];
  let problem = result[2];

  if (problem === ''){
    exports.fetchContest(formatUrl(contest, problem));
  }
  else {
    exports.fetchProblem(formatUrl(contest, problem));
  }
}

