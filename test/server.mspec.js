var rewire = require('rewire');
var assert = require('chai').assert;
var server = rewire('../src/server');
var sinon = require('sinon');

describe('Server', function() {
	it('should export an object', function() {
		assert.isObject(server, 'Server should be an Object type');
	});
	describe('public API', function() {
		['start', 'setFiles'].forEach(function(method) {
			it('should expose #' + method + ' in it\'s public interface', function() {
				assert.isFunction(server[method], '#' + method + ' should be a function');
			});
		});
	});

	describe('#start', function() {
		var appMock = {
			use: sinon.spy(),
			listen: sinon.spy(),
			get: sinon.spy(),
			post: sinon.spy(),
			route: sinon.spy()
		};
		beforeEach(function() {

		});
		afterEach(function() {

		});
		it('should throw an error if called before #setFiles', function() {
			assert.throws(server.start);
		});
	});
});