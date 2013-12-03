var syntax = require('../../lib/syntax');

describe('Synax helper library', function() {

    // Generic
    it('should be in /lib/spec.js', function(done) {
        expect(syntax).not.toBeNull();
        done();
    });
    it('should have an extension map object', function(done) {
        expect(syntax.extensionMap).toEqual(jasmine.any(Object));
        done();
    });
    it('should have a get syntax helper', function(done) {
        expect(syntax.getSyntax).toEqual(jasmine.any(Function));
        done();
    });
    it('should have a show supported syntaxes helper', function(done) {
        expect(syntax.showSupportedSyntaxes).toEqual(jasmine.any(Function));
        done();
    });
});