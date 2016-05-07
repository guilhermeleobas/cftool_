var chai = require ('chai');
var expect = require ('chai').expect;
var run = require ('./../src/run.js');
var compile = require ('./../src/compile.js');
var execSync = require ('child_process').execSync;

function testRun(output, testStr, done) {

  try {
    expect (output).to.have.property('stdout', testStr + "\n");
    expect (output).to.have.property('status', 'ok');
    expect (output).to.have.property('time');
    expect (output.time).to.contains('ms');
    done();
  } catch(err) {
    done(output.err);
  }

}

describe ('test run command', function (){
  
  before (function (){
    execSync('echo \'teste1\' > teste1.txt');
    execSync('echo \'a sentence lorem ipsum\' > teste2.txt');
    execSync('echo \'pong\\npong\\npong\' > teste3.txt');
    compile.compile("test/source_code/echo.cpp", "c++");
  });
  
  it ('should return the input as output (py1)', function (done){
    run.run ('test/source_code/echo.py', 'python', 'teste1.txt').then(function (output){
      testRun(output, "teste1", done);
    });
  });
  
  it ('should return the input as output (py2)', function (done){
    run.run ('test/source_code/echo.py', 'python', 'teste2.txt').then(function (output){
      testRun(output, "a sentence lorem ipsum", done);
    });
  });
  
  it ('should return the input as output (cpp1)', function (done){
    run.run ('test/source_code/echo.cpp', 'c++', 'teste1.txt').then(function (output){
      testRun(output, "teste1", done);
    });
  });
  
  it ('should return the input as output (cpp2)', function (done){
    run.run ('test/source_code/echo.cpp', 'c++', 'teste2.txt').then(function (output){
      testRun(output, "a sentence lorem ipsum", done);
    });
  });
  
  it ('should return the input as output (js1)', function (done){
    run.run ('test/source_code/echo.js', 'node', 'teste1.txt').then(function (output){
      testRun(output, "teste1", done);
    });
  });
  
  it ('should return the input as output (js2)', function (done){
    run.run ('test/source_code/echo.js', 'node', 'teste2.txt').then(function (output){
      testRun(output, "a sentence lorem ipsum", done);
    });
  });
  
  it ('should return the input as output (js3)', function (done){
    run.run ('test/source_code/echo3.js', 'node', 'teste3.txt').then(function (output){
      testRun(output, "pong\npong\npong", done);
    });
  });
  
  after (function (){
    execSync('rm -f teste*.txt');
    execSync("rm main");
  });
});
