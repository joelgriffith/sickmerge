'use strict';

var gitStrip = require('../lib/gitStrip.js'),
    fs = require('fs'),
    testData;

exports['gitstrip'] = {
  setUp: function(done) {
    fs.readFile('fixtures/test', function(err, result) {
      testData = result;
      done();
    });
  },
  tearDown: function (done) {
    // cleanup
    done();
  },
  'no args': function(test) {
    test.expect(1);
    test.throws(gitStrip(), 'Invalid file was passed to git strip, please pass it a string.', 'Should show an error message.');
    test.done();
  },
  'normal operation': function(test) {
    test.expect(1);
    test.equal(gitStrip(this.testText), Array, 'Should not throw an error when a valid file is passed');
    test.done();
  }
};