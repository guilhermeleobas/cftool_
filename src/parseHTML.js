var request = require ('request');
var cheerio = require ('cheerio');
var child_process = require ('child_process');

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
  return this.parser ($, INPUT);
}

exports.getOutput = function ($){
  return this.parser ($, OUTPUT);
}

exports.checkArraySize = function (data){
  if (data[0].length == data[1].length) return data;
  else return new Error ("error");
}

module.exports.getContestNumberAndProblem = function (url){
  url.replace ('http://', '');
  var regex = "codeforces.com\/contest\/(.*)\/problem\/(.*)"
  var aux = url.match (regex);
  return aux.slice(1);
}

module.exports.getContestNumber = function (url){
  return this.getContestNumberAndProblem(url)[0];
}

module.exports.getProblemLetter = function (url){
  return this.getContestNumberAndProblem(url)[1];
}