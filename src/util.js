var cheerio = require ('cheerio');

var CODEFORCES_LINK = "http://codeforces.com/contest"
var INPUT = 'input'
var OUTPUT = 'output'

exports.getProblem = getProblem;
exports.getContest = getContest;
exports.parser = parser;
exports.getInput = getInput;
exports.getOutput = getOutput;
exports.checkUrl = checkUrl;
exports.checkArraySize = checkArraySize;
exports.loadHTML = loadHTML;

function loadHTML (html){
  return cheerio.load(html);
}

// type must be 'input' or 'output'
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

function getInput ($){
  return parser ($, INPUT);
}

function getOutput ($){
  return parser ($, OUTPUT);
}

function checkUrl (url){
  if (url.includes(CODEFORCES_LINK)){
    return true;
  }
  return false;
}

function checkArraySize (data){
  if (data[0].length == data[1].length) return data;
  else return new Error ("error");
}

function getContestNumberAndProblem (url){
  return url.match("http:\/\/codeforces\.com\/contest\/(.*)\/problem\/(.*)").slice(1);
}

function getContest (url){
  return getContestNumberAndProblem(url)[0];
}

function getProblem (url){
  return getContestNumberAndProblem(url)[1];
}
