var path = require ('path');
var dump = require ('./dump');
var util = require ('./util');
var get = require ('./get');
var commander = require ('commander');

commander
  .version ('1.0')
  .option('-p, --problem <url>', 'Get input/output for a problem')
  .option('-c, --contest <url>', 'Get input/output for each problem in a contest')
  .parse (process.argv);

function getProblem (problemUrl){

  var inputs = [];
  var outputs = [];

  var url = util.formatUrl(problemUrl);

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
  var url = util.formatUrl(contestUrl);

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

function main (){

  if (commander.problem){
    getProblem(commander.problem);
  }
  else if (commander.contest){
    getContest(commander.contest);
  }


}

main()
