process.env.NODE_ENV = 'test';

var sickservice = require('../server/sickserver'),
    request = require('request'),
    fixture = {
        hostname: 'localhost',
        port: 1337,
        syntax: '',
        location: './spec/fixtures/javascript.js',
        threeWayMerge : {
            localTitle: 'local',
            incomingTitle: 'Incoming',
            yours: 'wat!',
            theirs: 'what?!?',
            merge: 'wat!\nwhat?!?'
        }
    };

describe('Sickservice', function() {
    it('should be present in /server/sickserver', function(done) {
        expect(sickservice).not.toBe(null);
        done();
    });

    describe('web server', function() {
        beforeEach(function() {
            sickservice.init(fixture).startServer();
        });
        afterEach(function() {
            sickservice.closeServer();
        });
        it('should respond to requests', function(done) {
            request('http://127.0.0.1:1337', function(err, result) {
                expect(result.statusCode).toEqual(200);
                done();
            });
        });
        it('should have serve the client javascript', function(done) {
            request('http://127.0.0.1:1337/build/js/main.js', function(err, result) {
                expect(result.statusCode).toEqual(200);
                done();
            });
        });
        it('should have serve the client css', function(done) {
            request('http://127.0.0.1:1337/build/css/main.css', function(err, result) {
                expect(result.statusCode).toEqual(200);
                done();
            });
        });
    });

    describe('routes', function() {
        beforeEach(function() {
            spyOn(sickservice, 'closeServer').andCallThrough();
            sickservice.init(fixture).startServer();
        });
        it('should close the process when /cancel URL is queried', function(done) {
            request('http://127.0.0.1:1337/cancel', function() {
                expect(sickservice.closeServer).toHaveBeenCalled();
                done();
            });                
        });
        it('should close the process when /save URL is queried', function(done) {
            request.post('http://127.0.0.1:1337/save', {}, function() {
                expect(sickservice.closeServer).toHaveBeenCalled();
                done();
            });                
        });
    });

    describe('error handling', function() {
        it('shouldn\'t error when no config object is passed to it', function(done) {
            sickservice.init().startServer();
            request('http://127.0.0.1:3000', function(err, result) {
                expect(result.statusCode).toEqual(200);
                done();
            });
        });
    });
});