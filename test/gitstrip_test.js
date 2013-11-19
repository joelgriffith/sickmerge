'use strict';

var gitStrip = require('../lib/gitStrip.js'),
    dummyFunction = function() {};

exports['gitstrip'] = {
  setUp: function(done) {
    done();
  },
  'no args': function(test) {
    test.expect(1);
    test.equal(gitStrip(), 'Please pass a file to parse and a callback function', 'Should show an error message.');
    test.done();
  },
  'invalid file' : function(test) {
    test.expect(1);
    test.throws(gitStrip('notafile'), 'Should return an error when doesn\'t exist');
    test.done();
  },
  'normal operation': function(test) {
    test.expect(1);
    test.doesNotThrow(gitStrip('fixtures/test', dummyFunction), 'Should not throw an error when a valid file is passed');
    test.done();
  }
};