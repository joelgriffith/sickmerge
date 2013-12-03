var syntax = require('../../lib/syntax'),
    hasDuplicates = function(array) {
        var valuesSoFar = {};
        for (var i = 0; i < array.length; ++i) {
            var value = array[i];
            if (Object.prototype.hasOwnProperty.call(valuesSoFar, value)) {
                return true;
            }
            valuesSoFar[value] = true;
        }
        return false;
    };

describe('Syntax theme helper library', function() {

    // Generic
    it('should be in /lib/spec.js', function(done) {
        expect(syntax).not.toBeNull();
        done();
    });
    it('should have an extension map object', function(done) {
        expect(syntax.extensions).toEqual(jasmine.any(Object));
        done();
    });
    it('should have a get syntax theme helper', function(done) {
        expect(syntax.getSyntax).toEqual(jasmine.any(Function));
        done();
    });
    it('should have a show supported syntax themes helper', function(done) {
        expect(syntax.showSupportedSyntaxes).toEqual(jasmine.any(Function));
        done();
    });

    describe('get syntax theme helper', function() {
        it('should return an empty string when no extension is found', function(done) {
            expect(syntax.getSyntax('notavailable')).toEqual('');
            done();
        });
        it('should return an empty string when an invalid option is passed to it', function(done) {
            expect(syntax.getSyntax({})).toEqual('');
            expect(syntax.getSyntax(9)).toEqual('');
            expect(syntax.getSyntax([])).toEqual('');
            expect(syntax.getSyntax(true)).toEqual('');
            expect(syntax.getSyntax(false)).toEqual('');
            done();
        });
        it('should return syntax theme when a valid extension is passed', function(done) {
            expect(syntax.getSyntax('js')).toEqual('javascript');
            expect(syntax.getSyntax('php')).toEqual('php');
            expect(syntax.getSyntax('css')).toEqual('css');
            done();
        });
    });

    describe('show supported syntaxes helper', function() {
        var results;
        beforeEach(function() {
            results = syntax.showSupportedSyntaxes();
        });
        it('should return a comma-separated list of available themes', function(done) {
            expect(results).toContain(',');
            done();
        });
        it('should not have repeated themes in the output', function(done) {
            var hasDuplicateThemes = hasDuplicates(results.split(', '));
            expect(hasDuplicateThemes).toBe(false);
            done();
        });
    });
});