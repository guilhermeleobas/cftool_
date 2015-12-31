var cheerio = require ('cheerio');

var CONTESTLINK = 'http://codeforces.com/contest'
var INPUT = 'input'
var OUTPUT = 'output'

exports.loadHTML = loadHTML;
function loadHTML (html){
  return cheerio.load(html);
}

// type must be 'input' or 'output'
exports.parser = parser;
function parser ($, type){
  var length = $('div.sample-test').children('div.' + type).children('pre').length
  var data = [];
  for (var i=0; i<length; i++){
    var aux = $('div.sample-test').children('div.' + type).children('pre').eq(i).html();
    aux = aux.replace(/<br\s*\/?>/mg,"\n");
    data.push(aux);
  }

  return data;
}

exports.parseContest = parseContest;
function parseContest ($){
  var length = $('td.id').length;
  var links = [];
  for (var i=0; i<length; i++){
    var aux = $('td.id').children('a').eq(i).attr('href');
    aux = 'http://codeforces.com' + aux;
    links.push (aux);
  }
  return links;
}

exports.getInput = getInput;
function getInput ($){
  return parser ($, INPUT);
}

exports.getOutput = getOutput;
function getOutput ($){
  return parser ($, OUTPUT);
}

exports.checkArraySize = checkArraySize;
function checkArraySize (data){
  if (data[0].length == data[1].length) return data;
  else return new Error ("error");
}

exports.getContestNumberAndProblem = getContestNumberAndProblem;
function getContestNumberAndProblem (url){
  url.replace ('http://', '');
  var regex = "codeforces.com\/contest\/(.*)\/problem\/(.*)"
  var aux = url.match (regex);
  return aux.slice(1);
}

exports.getContest = getContest;
function getContest (url){
  return getContestNumberAndProblem(url)[0];
}

exports.getProblem = getProblem;
function getProblem (url){
  return getContestNumberAndProblem(url)[1];
}

exports.formatUrl = formatUrl;
function formatUrl(url){
  if (url.match ("http://") == null){
    url = "http://" + url;
  }

  return url;
}
