var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');


// var domain = "http://codeforces.com/contest/512/problem/A"
// request (domain, function callback (err, response, html){
//   $ = $.load(html);
// })

function getInputs ($, type){
  var length = $('div.sample-test').children('div.' + type).children('pre').length
  var data = [];
  for (var i=0; i<length; i++){
    var aux = $('div.sample-test').children('div.' + type).children('pre').eq(i).html();
    aux = aux.replace(/<br\s*\/?>/mg,"\n");
    data.push(aux);
  }

  return data;
}

var data = fs.readFileSync('cf.html', 'utf-8');

var $ = cheerio.load(data);

var input = getInputs($, 'input');
var output = getInputs($, 'output');

for (key of input){
  console.log(key);
}