var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

var CODEFORCES_LINK = "http://codeforces.com/contest"
var INPUT = 'input'
var OUTPUT = 'output'

// function get

// var domain = "http://codeforces.com/contest/512/problem/A"
// request (domain, function callback (err, response, html){
//   $ = $.load(html);
// })

// function getInputs ($, type){
//   var length = $('div.sample-test').children('div.' + type).children('pre').length
//   var data = [];
//   for (var i=0; i<length; i++){
//     var aux = $('div.sample-test').children('div.' + type).children('pre').eq(i).html();
//     aux = aux.replace(/<br\s*\/?>/mg,"\n");
//     data.push(aux);
//   }

//   return data;
// }

// var data = fs.readFileSync('cf.html', 'utf-8');

// var $ = cheerio.load(data);

// var input = getInputs($, 'input');
// var output = getInputs($, 'output');

// for (key of input){
//   console.log(key);
// }

// function getPage (domain){
//   request (domain, parser)
// }

// type could be 'input' or 'output'
function get ($, type){
  var length = $('div.sample-test').children('div.' + type).children('pre').length
  var data = [];
  for (var i=0; i<length; i++){
    var aux = $('div.sample-test').children('div.' + type).children('pre').eq(i).html();
    aux = aux.replace(/<br\s*\/?>/mg,"\n");
    data.push(aux);
  }

  return data;
}

// function parser (err, response, html){
//   return new Promise (function (resolve, reject){
//     if (err) reject (err);

//     var inputs = [];
//     var outputs = [];

//     var $ = cheerio.load(html);

//     inputs = get ($, INPUT);
//     outputs = get ($, OUTPUT);

//     resolve ([inputs, output]);
//   })
// }

function getPage (domain){
  return new Promise ((resolve, reject) =>
    request (domain, function (err, response, html){
      if (err) reject (err);

      var inputs = [];
      var outputs = [];

      var $ = cheerio.load (html);

      inputs = get ($, INPUT);
      outputs = get ($, OUTPUT);

      resolve ([inputs, outputs]);
    })
  )
}

function checkUrl (domain){
  if (domain.includes(CODEFORCES_LINK)){
    return true;
  }
  return false;
}

function checkArraySize (data){
  return new Promise ((resolve, reject) =>
    resolve (data)
  )
}

function writeDataToFile (data){
  return new Promise ((resolve, reject) =>
    var dir = path.resolve (path.dirname());

  )
}

function main (){
  var args = process.argv.slice (2);

  if (args.length == 0){
    console.error ("Missing URL");
    process.exit(1);
  }

  var domain = args[0];

  if (checkUrl(domain) == false){
    console.error ("Invalid URL");
    process.exit(1);
  }

  getPage (domain)
  .then (function (data){
    return checkArraySize(data);
  })
  .then (function (data){
    return writeDataToFile (data);
  })
  .catch (console.log.bind (console));

}

main()
