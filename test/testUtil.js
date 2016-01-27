var chai = require ('chai');
var expect = require ('chai').expect;
var util = require ('./../src/util.js');

chai.use (require('chai-things'));
chai.should();

describe ('ls should be', function (){
  
  it ('an array', function(){
    expect (util.ls()).to.be.a ('array');
  })

  it ('not be empty', function(){
    expect (util.ls()).not.be.empty;
  })

  it ('contains README.md and package.json', function (){
    expect (util.ls()).to.include.members(['package.json', 'README.md']);
  })

})