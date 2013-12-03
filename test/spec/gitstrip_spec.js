var gitStrip = require('../../lib/gitStrip'),
    fs = require('fs'),
    fixture = fs.readFileSync('./test/fixtures/javascript.js', 'UTF-8', function(err, result) {
        return result;
    });

describe('GitStrip Library', function() {

    // Generic
    it('should be in /lib/gitStip', function(done) {
        expect(gitStrip).not.toBeNull();
        done();
    });
    it('should error when no text is passed to it', function(done) {
        expect( function(){ gitStrip(); } ).toThrow(new Error('Invalid file was passed to git strip, please pass it a string.'));
        done();
    });
    it('should return an object of results', function(done) {
        expect(gitStrip('text')).toEqual(jasmine.any(Object));
        done();
    });

    // Checking the objects properties
    describe('results', function() {
        var results,
            gitComments = ['<<<<<<', '======', '>>>>>>'];

        beforeEach(function() {
            results = gitStrip(fixture);
        });
        it('should include the title for the "local" version', function(done) {
            expect(results.localTitle).toEqual('Local');
            done();
        });
        it('should include the title for the "incoming" version', function(done) {
            expect(results.incomingTitle).toEqual('Incoming');
            done();
        });
        it('should include a "theirs" text', function(done) {
            expect(results.yours).toEqual(jasmine.any(String));
            done();
        });
        it('should include a "yours" text', function(done) {
            expect(results.theirs).toEqual(jasmine.any(String));
            done();
        });
        it('should include a "merged" text', function(done) {
            expect(results.merge).toEqual(jasmine.any(String));
            done();
        });
        it('the merged strategy should default to the "yours" when none is passed', function(done) {
            expect(results.merge).toEqual(results.yours);
            done();
        });
        it('should strip out all git conflict comments', function(done) {
            expect(gitComments.indexOf(results.yours)).toEqual(-1);
            expect(gitComments.indexOf(results.theirs)).toEqual(-1);
            expect(gitComments.indexOf(results.merge)).toEqual(-1);
            done();
        });
    });

    describe('"yours" merge result', function() {
        var results;
        beforeEach(function() {
            results = gitStrip(fixture, 'yours');
        });
        it('should be the same as the "yours" result', function(done) {
            expect(results.merge).toEqual(results.yours);
            done();
        });
    });

    describe('"theirs" merge result', function() {
        var results;
        beforeEach(function() {
            results = gitStrip(fixture, 'theirs');
        });
        it('should be the same as the "theirs" result', function(done) {
            expect(results.merge).toEqual(results.theirs);
            done();
        });
    });

    describe('"both" merge result', function() {
        var results;
        beforeEach(function() {
            results = gitStrip(fixture, 'both');
        });
        it('should be different than "theirs" or "yours" result', function(done) {
            expect(results.merge).not.toBe(results.theirs);
            expect(results.merge).not.toBe(results.yours);
            done();
        });
    });
});