#!/usr/bin/env node

var commander = require ('commander');
var fwrite = require ('./fwrite.js');
var parseHTML = require ('./parseHTML.js')


function downloadProblem (problemUrl){

  var inputs = [];
  var outputs = [];

  var url = problemUrl;

  parseHTML.getHTML (url)
  .then (function (html){
    var $ = parseHTML.loadHTML(html);
    return $;
  })
  .then (function ($){
    inputs = parseHTML.getInput ($);
    outputs = parseHTML.getOutput ($);
    return [inputs, outputs];
  })
  .then (function (data){
    return parseHTML.checkArraySize(data);
  })
  .then (function (data){
    var contest = parseHTML.getContestNumber(url);
    var problem = parseHTML.getProblemLetter(url);
    console.log (contest, problem);
    return fwrite (data[0], data[1], contest, problem);
  })
  .catch (console.log.bind (console));
}

function downloadContest (contestUrl){

  var url = contestUrl;

  parseHTML.getHTML(url)
  .then(function(html){
    return parseHTML.loadHTML(html);
  })
  .then(function ($){
    return parseHTML.parseContest($);
  })
  .then(function (links){
    links.forEach(getProblem);
  })
}

function formatUrl (contest, problem){
  if (problem != ''){
    return 'http://codeforces.com/contest/' + contest + '/problem/' + problem;
  }
  else {
    return 'http://codeforces.com/contest/' + contest;
  }
}

function download (number){
  var result = number.match (/(\d{1,3})(\D*)/);
  var contest = result[1];
  var problem = result[2];

  if (problem == ''){
    downloadContest(formatUrl(contest, problem));
  }
  else {
    downloadProblem(formatUrl(contest, problem));
  }
}



commander
  .version('1.0')

commander
  .command ('get <number>')
  .description('Get input/output for a problem or contest')
  .action (function (number){
    download(number);
  })

commander
  .command ('test <file> <problem>')
  .description ('Test your code against a problem')
  .option ('-l, --language <language>', 'Specify a language to be used instead of the default value')
  .action (function (file, problem, options){
    if (commander.language){
      console.log ("opa")
      console.log ("language: %s", commander.language);
    }
    console.log (options.language);
    // console.log(file, problem);
  })

commander
  .parse (process.argv);
