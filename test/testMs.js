var ms = require ('./../src/ms.js');
var expect = require ('chai').expect

describe ('test ms.js', function (){
  it ('should test ms', function (){
    
    expect (ms.format('1')).to.equal('1ms');
    expect (ms.format(999)).to.equal('999ms');
    expect (ms.format('998.999')).to.equal('999ms')
    
  })
  
  it ('should test s', function (){

    expect (ms.format ('999.999')).to.equal('1s');
    expect (ms.format ('10000')).to.equal('10s');
    expect (ms.format ('1000.01')).to.equal('1s');
    expect (ms.format (1000 + 100)).to.equal('1s');
    expect (ms.format (1000 + 2000)).to.equal('3s');
    
  })
  
  it ('should test m', function (){

    expect (ms.format (1 * 1000 * 60)).to.equal('1m');
    expect (ms.format (1 * 1000 * 60 * 2)).to.equal('2m');
    expect (ms.format (1 * 1000 * 60 * 59 + 100)).to.equal ('59m')
    
  })
  
  it ('should test h', function (){
    
    expect (ms.format (1 * 1000 * 60 * 60)).to.equal('1h');
    expect (ms.format (1 * 1000 * 60 * 60 * 2)).to.equal('2h');
    expect (ms.format (1 * 1000 * 60 * 60 * 59 + 100)).to.equal ('59h')
    
  })
})
