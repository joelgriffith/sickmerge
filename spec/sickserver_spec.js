process.env.NODE_ENV = 'test';

var sickservice = require('../server/sickserver'),
    request = require('request'),
    fixture = {
        hostname: 'localhost',
        port: 1337,
        syntax: '',
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
});