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

	describe('#setFiles', function() {
		var prevFiles = server.__get__('files');
		afterEach(function() {
			server.__set__('files', prevFiles);
		});
		it('should set the private array with files', function() {
			var mockFiles = [{
				id: 1
			}];
			server.setFiles([{
				id: 1
			}]);
			assert.deepEqual(mockFiles, server.__get__('files'));
		});
	});

	describe('#start', function() {
		var fileMock = {
			id: 1,
			name: 'test-file.txt',
			contents: 'a clean file!'
		};
		var postStub = sinon.stub();
		var getStub = sinon.stub().returns({
			post: postStub
		});
		var routeStub = sinon.stub().returns({
			get: getStub
		});
		var appMock = {
			use: sinon.stub(),
			listen: sinon.stub(),
			route: routeStub
		};
		beforeEach(function() {
			server.__set__('app', appMock);
		});
		afterEach(function() {
			for (var key in appMock) {
				appMock[key].reset();
			}
		});
		it('should throw an error if called before #setFiles', function() {
			assert.throws(server.start);
		});
		it('should use the public directory', function() {
			server.setFiles([fileMock]);
			server.start();
			assert.isFunction(appMock.use.getCall(0).args[0], 'Server didnt call `use` with a function');
		});
		it('should call listen on the provided port', function() {
			server.setFiles([fileMock]);
			server.start(1337);
			assert.equal(1337, appMock.listen.getCall(0).args[0], 'Server didn\'t listen on the port provided');
		});
		it('should set a callback for the `get` route', function() {
			server.setFiles([fileMock]);
			server.start();
			assert.isFunction(getStub.getCall(0).args[0]);
		});
		it('should set a callback for the `post` route', function() {
			server.setFiles([fileMock]);
			server.start();
			assert.isFunction(getStub.getCall(0).args[0]);
		});

		describe('`get` callback', function() {
			beforeEach(function() {
				server.setFiles([fileMock]);
				server.start();
			});
			it('should send the `files` array', function() {
				var resStub = {
					send: sinon.stub()
				};
				getStub.getCall(0).args[0](null, resStub);
				assert.deepEqual(resStub.send.getCall(0).args[0], [fileMock]);
			});
		});

		describe('`post` callback', function() {
			var fsStub = {
				writeFileSync: sinon.stub()
			};
			var resStub = {
				send: sinon.stub()
			};
			var reqMock = {
				params: {
					fileName: fileMock.name,
					contents: fileMock.contents
				}
			};
			beforeEach(function() {
				server.__set__('fs', fsStub);
				server.setFiles([fileMock]);
				server.start();
				postStub.getCall(0).args[0](reqMock, resStub);
			});
			afterEach(function() {
				fsStub.writeFileSync.reset();
				resStub.send.reset();
			});
			it('should tell `writeFileSync` the propper location of the file', function() {
				assert.equal(fileMock.name, fsStub.writeFileSync.getCall(0).args[0]);
			});
			it('should pass to `writeFileSync` the contents of the file', function() {
				assert.equal(fileMock.contents, fsStub.writeFileSync.getCall(0).args[1]);
			});
			it('should register a callback when `writeFileSync` finished', function() {
				assert.isFunction(fsStub.writeFileSync.getCall(0).args[2]);
			});
			it('should send `ok` if writing the file out is successful', function() {
				fsStub.writeFileSync.getCall(0).args[2](null);
				assert.equal('ok', resStub.send.getCall(0).args[0]);
			});
			it('should send the error message if writing the file out fails', function() {
				fsStub.writeFileSync.getCall(0).args[2]('err');
				assert.equal('err', resStub.send.getCall(0).args[0]);
			});
		});
	});
});