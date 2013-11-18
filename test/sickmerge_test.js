'use strict';

var gitStrip = require('../lib/gitStrip.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

// exports['awesome'] = {
//   setUp: function(done) {
//     // setup here
//     done();
//   },
//   'no args': function(test) {
//     test.expect(1);
//     // tests here
//     test.equal(sickmerge.awesome(), 'awesome', 'should be awesome.');
//     test.done();
//   },
// };

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
  }
};