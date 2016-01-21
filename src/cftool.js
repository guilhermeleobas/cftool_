#!/usr/bin/env node

var commander = require ('commander');
var dump = require ('./dump.js');
var util = require ('./util.js');
var get = require ('./get.js');

commander
  .version('1.0')
  .option ('-g, --get <problem>', 'Get input/output for a problem or contest')
  .parse (process.argv);

function getProblem (problemUrl){

  var inputs = [];
  var outputs = [];

  var url = problemUrl;

  get.getHTML (url)
  .then (function (html){
    var $ = util.loadHTML(html);
    return $;
  })
  .then (function ($){
    inputs = util.getInput ($);
    outputs = util.getOutput ($);
    return [inputs, outputs];
  })
  .then (function (data){
    return util.checkArraySize(data);
  })
  .then (function (data){
    var contest = util.getContest(url);
    var problem = util.getProblem(url);
    console.log (contest, problem);
    return dump (data[0], data[1], contest, problem);
  })
  .catch (console.log.bind (console));
}

function getContest (contestUrl){

  var url = contestUrl;

  get.getHTML(url)
  .then(function(html){
    return util.loadHTML(html);
  })
  .then(function ($){
    return util.parseContest($);
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

function main (){

  if (commander.get){
    var result = commander.get.match (/(\d{1,3})(\D*)/);
    var contest = result[1];
    var problem = result[2];

    if (problem == ''){
      getContest(formatUrl(contest, problem));
    }
    else {
      getProblem(formatUrl(contest, problem));
    }
  }


}

main()
