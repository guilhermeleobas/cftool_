var chai = require ('chai');
var expect = require ('chai').expect;
var compile = require ('./../src/compile.js');
var fs = require ('fs');

describe ('Detect language', function (){
  it ('a.cc => c++', function (){
    expect (compile.detect("aa.cc")).to.equal('c++');  
  })

  it ('a.c => c', function(){
    expect (compile.detect("a.c")).to.equal('c');  
  })

  it ('a.py => python', function(){
    expect (compile.detect("a.py")).to.equal('python');  
  })

  it ('cc.python.java.c.java => java', function(){
    expect (compile.detect("cc.python.c.java.c.c.java")).to.equal('java');  
  })

  it ('very long string ending with .c => c', function(){
    expect (compile.detect("averylongstringwithnumbers1234567890.c")).to.equal('c');  
  })

  it ('a.file.with.dots.c => c', function(){
    expect (compile.detect("a.file.with.dots.c")).to.equal('c');  
  })

  it ('a file without dots => invalid', function(){
    expect (compile.detect("a file without dots")).to.equal('');
  })
})

describe ('Compile a program', function (){
  it ('should compile goodcpp.cc', function (done){
    compile.compile("test/source_code/goodcpp.cc", null).then( function (output){

      expect (output).to.have.property('exec')
      expect (output).to.have.property('status')
      expect (output).to.not.have.property('status', 'error');
      expect (output).to.have.property('exec', 'main');

      done();
    });
  });

  it ('should compile goodcpp2.cc', function (done){
    compile.compile("test/source_code/goodcpp2.cc", "c++11").then( function (output){

      expect (output).to.have.property('exec')
      expect (output).to.have.property('status', 'ok')
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

      expect (output).to.have.property('status', 'error')
      expect (output).to.have.property('err');

      done();
    });
  });

  it ('should not compile badcpp2.cc', function (done){
    compile.compile ("test/source_code/badcpp2.cc", null).catch( function (output){

      expect(output).to.have.property('status', 'error')
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
    var execSync = require ('child_process').execSync;
    execSync ('rm -f main');
  });
})
