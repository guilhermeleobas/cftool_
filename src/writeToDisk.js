var fs = require ('fs')
var path = require ('path')

function mkdirSync (path) {
  try {
    fs.mkdirSync(path)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}


module.exports = function (inputs, outputs, contest, problem){
  // __dirname => current directory;
  _dir = process.cwd() + '/' + contest + problem.toLowerCase();
  mkdirSync (_dir);
  
  var files = {in: [], out: []};
  
  for (i in inputs){
    _filename = path.format({
      root: '/',
      dir: _dir,
      base: i.toString() + '.in',
      ext: '.in',
      name: i.toString()
    })
    fs.writeFileSync (_filename, inputs[i], 'utf-8')
    files.in.push (_filename);
    //console.log (_filename);
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
    files.out.push (_filename);
    //console.log (_filename);
  }
  
  return files;
}
