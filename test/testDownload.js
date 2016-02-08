#!/usr/bin/env node

// Test methods related to downloading a problem in/out.

"use strict";

var chai = require ('chai');
var expect = require ('chai').expect;
var fetch = require ('./../src/fetchAndParse.js');
var cf = require ('./../src/cftool.js');

chai.should();

describe ('Get contest', function (){
  it ('returns the contest number', function (){
    var url = 'http://codeforces.com/contest/512/problem/A';
    expect(fetch.getContestNumber(url)).to.equal('512')
                                .and.to.be.a('string');
  })

})

describe ('Get problem', function (){
  it ('returns the problem letter', function (){
    let url = 'http://codeforces.com/contest/500/problem/A';
    expect(fetch.getProblemLetter(url)).to.equal('A')
                                .and.to.be.a('string');
  })

  it ('returns the problem letter in a link without http://', function (){
    let url = 'codeforces.com/contest/500/problem/C';
    expect(fetch.getProblemLetter(url)).to.equal('C')
                                .and.to.be.a('string');
  })
})

describe ('Get problems from contest link', function (){
  it ('should return 6 links from A to F', function (done){
    this.timeout(5000);

    let url = 'http://codeforces.com/contest/600';
    
    fetch.getHTML(url)
    .then(function (html){
      let $ = fetch.loadHTML(html);
      return $;
    }).then(function ($){
      let links = fetch.parseContest($, url);
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
    
    let url = 'http://codeforces.com/contest/1';
    
    fetch.getHTML(url)
    .then(function (html){
      var $ = fetch.loadHTML(html);
      return $;
    }).then(function ($){
      return fetch.parseContest($);
    })
    .then (function (links){
      expect (links).to.be.a('array')
      expect (links).to.have.length(3);
      done();
    })
    .catch (console.log.bind (console));
  })
})

describe ('Test cases without a <br> tag at the end', function (){
  it ('should add a <br> tag in test cases without one', function (done){
    this.timeout (5000);

    let url = 'http://codeforces.com/contest/550/problem/E';

    let inputs = [];
    let outputs = [];

    return fetch.getHTML (url)
    .then (function (html){
      return fetch.loadHTML(html);
    })
    .then (function ($){
      inputs = fetch.getInput ($);
      outputs = fetch.getOutput ($);

      expect (outputs[1]).to.be.a ('string');
      expect (outputs[0]).to.be.a ('string');

      expect (outputs[0]).to.equal ('YES\n(((0)->1)->(1->0))\n');
      expect (outputs[1]).to.equal ('NO\n');
      done();
    })
    .catch (done)
    
  });


  it ('should add a <br> tag in test cases without one', function (done){
    this.timeout (2000);

    let url = 'http://codeforces.com/contest/621/problem/A';

    let inputs = [];
    let outputs = [];

    return fetch.getHTML (url)
    .then (function (html){
      return fetch.loadHTML(html);
    })
    .then (function ($){
      inputs = fetch.getInput ($);
      outputs = fetch.getOutput ($);

      expect (outputs[1]).to.be.a ('string');
      expect (outputs[0]).to.be.a ('string');

      expect (outputs[0]).to.equal ('6\n');
      expect (outputs[1]).to.equal ('3999999996\n');
      done();
    })
    .catch (done)
    
  });
});
