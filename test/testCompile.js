var execSync = require ('child_process').execSync;
var chai = require ('chai');
var expect = require ('chai').expect;
var compile = require ('./../src/compile.js');
var fs = require ('fs');

describe ('Detect language', function (){
  it ('a.cc => c++', function (){
    expect (compile.detect("aa.cc")).to.equal('c++');  
  });

  it ('a.c => c', function(){
    expect (compile.detect("a.c")).to.equal('c');  
  });

  it ('a.py => python', function(){
    expect (compile.detect("a.py")).to.equal('python');  
  });

  it ('cc.python.java.c.java => java', function(){
    expect (compile.detect("cc.python.c.java.c.c.java")).to.equal('java');  
  });

  it ('very long string ending with .c => c', function(){
    expect (compile.detect("averylongstringwithnumbers1234567890.c")).to.equal('c');  
  });

  it ('a.file.with.dots.c => c', function(){
    expect (compile.detect("a.file.with.dots.c")).to.equal('c');  
  });

  it ('a file without dots => invalid', function(){
    expect (compile.detect("a file without dots")).to.equal('');
  });
});

describe ('Compile a program', function (){
  it ('should compile goodcpp.cc', function (done){
    compile.compile("test/source_code/goodcpp.cc", null).then( function (output){

      expect (output).to.have.property('exec');
      expect (output).to.have.property('status');
      expect (output).to.not.have.property('status', 'error');
      expect (output).to.have.property('exec', 'main');

      done();
    });
  });

  it ('should compile goodcpp2.cc', function (done){
    compile.compile("test/source_code/goodcpp2.cc", "c++11").then( function (output){

      expect (output).to.have.property('exec');
      expect (output).to.have.property('status', 'ok');
      expect (output).to.not.have.property('status', 'error');
      expect (output).to.have.property('exec', 'main');

      done();
    });
  });

  it ('should not compile goodcpp2.cc with g++', function (done){
    compile.compile ('test/source_code/goodcpp2.cc', null).catch( function (output){

      expect (output).to.have.property('status', 'error');

      done();
    });
  });

  it ('should not compile badcpp.cc', function (done){
    compile.compile ("test/source_code/badcpp.cc", null).catch( function (output){

      expect (output).to.have.property('status', 'error');
      expect (output).to.have.property('err');

      done();
    });
  });

  it ('should not compile badcpp2.cc', function (done){
    compile.compile ("test/source_code/badcpp2.cc", null).catch( function (output){

      expect(output).to.have.property('status', 'error');
      expect(output).to.have.property('err');

      done();
    });
  });

  it ('should not compile a python program', function (done){
    compile.compile ('test/source_code/good.py', null).then( function (output){

      expect (output).to.have.property('status', 'not required');
      expect (output).to.have.property('exec', 'test/source_code/good.py');

      done();
    });
  });

  after (function (){
    execSync ('rm -f main');
  });
});


describe ('test compile messages', function (){

  it ('test compile message "pass"', function (done){
    var compileMessage = execSync ('./src/cftool.js compile test/source_code/good.py').toString();

    compileMessage = compileMessage.split ('\n').join ('');
    expect (compileMessage).to.equals ('Compile: pass');

    done();
  });

  it ('test compile message "ok"', function (done){
    var compileMessage = execSync ('./src/cftool.js compile test/source_code/goodcpp.cc').toString();

    compileMessage = compileMessage.split ('\n').join ('');

    expect (compileMessage).to.equals ('Compile: ok');

    done();
  });

  it ('test compile message "fail"', function (done){
    var compileMessage = execSync ('./src/cftool.js compile test/source_code/badcpp.cc').toString();

    compileMessage = compileMessage.split ('\n').join ('');

    expect (compileMessage).to.contains ('Compile: fail');

    done();
  });

  it ('show command used to compile when compilation fails', function (done){
    var compileMessage = execSync ('./src/cftool.js compile test/source_code/badcpp.cc').toString();

    compileMessage = compileMessage.split ('\n').join ('');

    expect (compileMessage).to.contains ('Command: g++ test/source_code/badcpp.cc -o main');

    done();
  });

  it ('show compile error message  "fail"', function (done){
    var compileMessage = execSync ('./src/cftool.js compile test/source_code/badcpp.cc').toString();

    compileMessage = compileMessage.split ('\n').join ('');

    expect (compileMessage).to.contains ('expected "FILENAME" or <FILENAME>');

    done();
  });

  after (function (){
    execSync ('rm -f main');
  });
});
