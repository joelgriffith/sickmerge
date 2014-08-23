var rewire = require('rewire');
var assert = require('chai').assert;
var git = rewire('../src/git');
var sinon = require('sinon');

describe('Git', function() {
	it('should export an object', function() {
		assert.isObject(git, 'Git should be an Object type');
	});
	describe('public API', function() {
		['getConflicted', 'getMine', 'getTheirs', 'getPlain'].forEach(function(method) {
			it('should expose #' + method + ' in it\'s public interface', function() {
				assert.isFunction(git[method], '#' + method + ' should be a function type');
			});
		});
	});

	describe('#getMine', function() {
		var fsMock = {
			readFileSync: sinon.stub().returns('wat')
		};
		beforeEach(function() {
			git.__set__('fs', fsMock);
		});
		afterEach(function() {
			fsMock.readFileSync.reset();
		});

		it('should return a string', function() {
			assert.isString(git.getMine());
		});
		it('should strip git conflict messages and return `mine` changes', function() {
			var mockContents = '<<<<<<< HEAD\nnine\n=======\neight\n>>>>>>> branch-a\n';
			fsMock.readFileSync.returns(mockContents);
			assert.equal('nine\n', git.getMine());
		});
	});

	describe('#getTheirs', function() {
		var fsMock = {
			readFileSync: sinon.stub().returns('wat')
		};
		beforeEach(function() {
			git.__set__('fs', fsMock);
		});
		afterEach(function() {
			fsMock.readFileSync.reset();
		});

		it('should return a string', function() {
			assert.isString(git.getMine());
		});
		it('should strip git conflict messages and return `their` changes', function() {
			var mockContents = '<<<<<<< HEAD\nnine\n=======\neight\n>>>>>>> branch-a\n';
			fsMock.readFileSync.returns(mockContents);
			assert.equal('eight\n', git.getTheirs());
		});
	});

	describe('#getPlain', function() {
		var fsMock = {
			readFileSync: sinon.stub().returns('wat')
		};
		beforeEach(function() {
			git.__set__('fs', fsMock);
		});
		afterEach(function() {
			fsMock.readFileSync.reset();
		});

		it('should return a string', function() {
			assert.isString(git.getMine());
		});
		it('should strip all git conflict messages', function() {
			var mockContents = '<<<<<<< HEAD\nnine\n=======\neight\n>>>>>>> branch-a\n';
			fsMock.readFileSync.returns(mockContents);
			assert.equal('nine\neight\n', git.getPlain());
		});
	});

	describe('#getConflicted', function() {
		it('should error when a callback is not supplied', function() {
			assert.throws(git.getConflicted, '#getConflicted expects a function callback', 'Should throw an error when not provided a callback');
		});
		it('should accept a callback for when the stream is finished', function(done) {
			git.getConflicted(function(data) {
				assert.isString(data);
				done();
			});
		});
	});
});