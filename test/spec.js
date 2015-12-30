var chai = require ('chai');
var expect = require ('chai').expect;
var getContest = require ('./../src/util.js').getContest;
var getProblem = require ('./../src/util.js').getProblem;

describe ('Get contest', function (){
  it ('returns the contest number', function (){
    var url = 'http://codeforces.com/contest/512/problem/A';
    expect(getContest(url)).to.equal('512');
    expect(getContest(url)).to.be.a('string');
  })

})

describe ('Get problem', function (){
  it ('returns the problem letter', function (){
    var url = 'http://codeforces.com/contest/500/problem/A';
    expect(getProblem(url)).to.equal('A');
    expect(getProblem(url)).to.be.a('string');
  })

  it ('returns the problem letter [2]', function (){
    var url = 'http://codeforces.com/contest/500/problem/C';
    expect(getProblem(url)).to.equal('C');
    expect(getProblem(url)).to.be.a('string');
  })
})

describe ('Get input', function(){
  it ('should get input', function (){
    var url = 'http://codeforces.com/contest/500/problem/A';
    expect ().to.be.a('array');
  })
})

describe ('Get output', function(){
  it ('should get output', function (){
    var url = 'http://codeforces.com/contest/500/problem/A';
    expect ().to.be.a('array');
  })
})

describe ('Get input and output', function(){
  it ('should compare input size', function (){
    var url = 'http://codeforces.com/contest/500/problem/A';
    expect ().to.be.a('array');
  })
})
