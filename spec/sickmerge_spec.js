var exec = require('child_process').exec,
    fs = require('fs');
    version = require('../package.json').version,
    execSickmerge = function(options, callback) {
        exec('sickmerge ' + options, function(err, stdout) {
            callback(stdout);
        });
    };

describe('Sickmerge', function() {
    it('should be present', function(done) {
        fs.readFile('./sickmerge.js', function(err) {
            expect(err).toBe(null);
            done();
        });
    });

    describe('command line options', function() {
        it('should output help when no options are passed', function(done) {
            execSickmerge('', function(response) {
                expect(response).toEqual(jasmine.any(String));
                done();
            });
        });
        it('should prompt an error message when an invalid file is passed', function(done) {
            execSickmerge('notafile', function(response) {
                expect(response).toContain('There was an error loading your file!');
                done();
            });
        });
        it('should print the version when using -V or --version', function(done) {
            execSickmerge('-V', function(response) {
                expect(response).toContain(version.toString());
                execSickmerge('--version', function(response) {
                    expect(response).toContain(version.toString());
                    done();
                });
            });
        });
        it('should print available syntaxes when using -o or --syntaxes', function(done) {
            execSickmerge('-o', function(response) {
                expect(response).toContain('Available options include:');
                execSickmerge('--syntaxes', function(response) {
                    expect(response).toContain('Available options include:');
                    done();
                });
            });
        });
    });
});