var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var path = require ('path');

var CODEFORCES_LINK = "http://codeforces.com/contest"
var INPUT = 'input'
var OUTPUT = 'output'

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

function getPage (url){
  return new Promise ((resolve, reject) =>
    request (url, function (err, response, html){
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

function mkdirSync (path) {
  try {
    fs.mkdirSync(path)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

function writeDataToFile (inputs, outputs, contest, problem){
  // __dirname => current directory;
  _dir = __dirname + '/' + contest + problem;
  mkdirSync (_dir);

  for (i in inputs){
    _filename = path.format({
      root: '/',
      dir: _dir,
      base: i.toString() + '.in',
      ext: '.in',
      name: i.toString()
    })
    fs.writeFileSync (_filename, inputs[i], 'utf-8')
    console.log (_filename);
  }

  for (i in outputs){
    _filename = path.format({
      root: '/',
      dir: _dir,
      base: i.toString() + '.out',
      ext: '.out',
      name: i.toString()
    })
    fs.writeFileSync (_filename, outputs[i], 'utf-8')
    console.log (_filename);
  }
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

function main (){
  var args = process.argv.slice (2);

  if (args.length == 0){
    console.error ("Missing URL");
    process.exit(1);
  }

  var url = args[0];

  if (checkUrl(url) == false){
    console.error ("Invalid URL");
    process.exit(1);
  }

  var contest = "";
  var problem = "";

  getPage (url)
  .then (function (data){
    return checkArraySize(data);
  })
  .then (function (data){
    contest = getContest(url);
    problem = getProblem(url);
    return writeDataToFile (data[0], data[1], contest, problem);
  })
  .catch (console.log.bind (console));

}

main()
