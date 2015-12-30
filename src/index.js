var path = require ('path');
var dump = require ('./dump')
var util = require ('./util')
var get = require ('./get')

function main (){
  var args = process.argv.slice (2);

  if (args.length == 0){
    console.error ("Missing URL");
    process.exit(1);
  }

  var url = args[0];

  if (util.checkUrl(url) == false){
    console.error ("Invalid URL");
    process.exit(1);
  }

  var contest = "";
  var problem = "";

  var inputs = [];
  var outputs = [];

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
    contest = util.getContest(url);
    problem = util.getProblem(url);
    return dump (data[0], data[1], contest, problem);
  })
  .catch (console.log.bind (console));
}

main()
