var chai = require ('chai');
var chaiAsPromised = require("chai-as-promised");
var expect = require ('chai').expect;
var util = require ('./../src/util.js');
var get = require ('./../src/get.js');

chai.use(chaiAsPromised);
chai.use (require('chai-things'));
chai.should();

describe ('Get contest', function (){
  it ('returns the contest number', function (){
    var url = 'http://codeforces.com/contest/512/problem/A';
    expect(util.getContest(url)).to.equal('512')
                                .and.to.be.a('string');
  })

})

describe ('Get problem', function (){
  it ('returns the problem letter', function (){
    var url = 'http://codeforces.com/contest/500/problem/A';
    expect(util.getProblem(url)).to.equal('A')
                                .and.to.be.a('string');
  })

  it ('returns the problem letter in a link without http://', function (){
    var url = 'codeforces.com/contest/500/problem/C';
    expect(util.getProblem(url)).to.equal('C')
                                .and.to.be.a('string');
  })
})

// describe ('request', function (){
//   it ('shoud return 404', function (){
//     var url = 'http://codeforces.com/contest/';
//     expect (get.getHTML (url)).to.eventually.be.rejected;
//   })
// })

describe ('Get problems from contest link', function (){
  it ('should return 6 links from A to F', function (done){
    this.timeout(5000);
    url = 'http://codeforces.com/contest/600';
    get.getHTML(url)
    .then(function (html){
      var $ = util.loadHTML(html);
      return $;
    }).then(function ($){
      var links = util.parseContest($, url);
      expect (links).to.be.a('array')
                    .to.have.length(6);

      links.every (function (l){
        expect (l).contain ("http://codeforces.com/contest/600/problem/")
      })

      done();
    })
    .catch (console.log.bind (console));
  })

  it ('should work with an old contest', function (done){
    this.timeout(5000);
    url = 'http://codeforces.com/contest/1';
    get.getHTML(url)
    .then(function (html){
      var $ = util.loadHTML(html);
      return $;
    }).then(function ($){
      return util.parseContest($);
    })
    .then (function (links){
      expect (links).to.be.a('array')
                    .to.have.length(3);
      done();
    })
    .catch (console.log.bind (console));
  })
})
