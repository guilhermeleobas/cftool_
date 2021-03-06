"use strict";

var chai = require ('chai');
var expect = require ('chai').expect;
var format = require ('./../src/format.js');

describe ('test formatLines method', function (){

  it ('should format an output with multiple lines', function (){
    let input = "6\n5\n4\n3\n2\n3\n3\n1\n1\n3\n2\n2\n1\n2\n3\n";

    let eOutput = "" +
      "6\n" + 
      "5\n" + 
      "4\n" + 
      "3\n" + 
      "2\n" + 
      "3\n" + 
      "3\n" + 
      "1\n" + 
      "1\n" + 
      "3\n" + 
      "2\n" + 
      "2\n" + 
      "1\n" + 
      "2\n" + 
      "3\n";


    let output = format.formatLines (input);
    expect (output).to.equals (eOutput);

  })

  it ('should format an inline output with only one number', function (){

    let input = "6\n";
    let expectedOutput = "6\n";

    let output = format.formatLines (input);

    expect (output).to.equals (expectedOutput);
  })

  it ('should format an inline output with multiple letters', function (){

    let input = "6 5 4 1 3";
    let expectedOutput = "6 5 4 1 3\n";

    let output = format.formatLines (input);

    expect (output).to.equals (expectedOutput);
  })

  it ('should format an output with multiple letters in lines', function (){

    let input = "6 6 6\n5 5 5\n4 4 4\n3 3 3\n2 2 2\n3 3 3\n3 3 3\n1 1 1\n1 1 1\n3 3 3\n2 2 2\n2 2 2\n1 1 1\n2 2 2\n3 3 3\n";

    let expectedOutput = "" +
      "6 6 6\n" + 
      "5 5 5\n" + 
      "4 4 4\n" + 
      "3 3 3\n" + 
      "2 2 2\n" + 
      "3 3 3\n" + 
      "3 3 3\n" + 
      "1 1 1\n" + 
      "1 1 1\n" + 
      "3 3 3\n" + 
      "2 2 2\n" + 
      "2 2 2\n" + 
      "1 1 1\n" + 
      "2 2 2\n" + 
      "3 3 3\n";

    let output = format.formatLines (input);

    expect (output).to.equals (expectedOutput);
  })
  
  it ('should format output [\\n<\\n{\\n', function (){
    let input = "[\n<\n{\n";
    let eoutput = "" +
      "[\n" +
      "<\n" +
      "{\n";
      
    let output = format.formatLines (input);
    
    expect (output).to.equals (eoutput);
  })
  
  it ('should format output {\\n(\\n[\\n', function (){
    let input = "{\n(\n[\n";
    let eoutput = "" + 
      "{\n" +
      "(\n" +
      "[\n";
      
    expect (format.formatLines (input)).to.equals (eoutput);
  });

});



describe ('test formatOutput method', function (){

  it ('Test  a simple input', function (){

    let input = {
      'stdout': "{\n(\n[\n",
      'err': 'ok',
      'time': '33ms'
    }
    let output = "" + 
      "{\n" +
      "(\n" +
      "[\n";

    let index = 0;

    let diffStatus = false;

    let eoutput = '' +
      '## Test #0' +
      '\n' +
      'Wrong answer - 33ms' + '\n' + 
      '+ expected  - actual' + '\n' +
      '-~-' + '\n' +
      '{\n' +
      '(\n' +
      '[\n' +
      '-~-' + '\n' +
      '{\n' +
      '(\n' +
      '[\n' +
      '-~-' + '\n';
    
    expect (format.formatOutput (input, output, index, diffStatus, false)).to.equals (eoutput);
  })
})
