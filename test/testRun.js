var chai = require ('chai');
var expect = require ('chai').expect;
var run = require ('./../src/run.js');
var execSync = require ('child_process').execSync;

describe ('test run command', function (){
  
  before (function (){
    execSync('echo \'teste1\' > teste1.txt');
    execSync('echo \'a sentence lorem ipsum\' > teste2.txt');
    execSync('echo \'pong\' > teste3.txt');
  })
  
  it ('should return the input as output', function (done){
    
    run.run ('test/source_code/echo.py', 'python', 'teste1.txt', function (output){
      
      expect (output).to.have.property('stdout', 'teste1\n');
      expect (output).to.have.property('status', 'ok');
      expect (output).to.have.property('time');
      expect (output.time).to.contains('ms');
      
      done();
    })
  })
  
  after (function (){
    execSync('rm -f teste*.txt');
  })
})
