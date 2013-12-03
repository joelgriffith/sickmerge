module.exports = {
    /*
     *  Extension Map
     *
     *  A map of common extions to their appropriate file types.
     *  Scheme:
     *      {extension} : {syntax type}
     */
    extensions: {
        'apl': 'apl',
        'clj': 'clojure',
        'cob': 'cobol',
        'coffee': 'coffeescript',
        'list': 'commonlisp',
        'cl': 'commonlisp',
        'css': 'css',
        'd': 'd',
        'diff': 'diff',
        'ecl': 'ecl',
        'e': 'eiffel',
        'erl': 'erlang',
        'f': 'fortran',
        'for': 'fortran',
        'f90': 'fortran',
        'f95': 'fortran',
        'groovy': 'groovy',
        'go': 'go',
        'haml': 'haml',
        'hs': 'haskell',
        'jade': 'jade',
        'js': 'javascript',
        'less': 'less',
        'ls': 'livescript',
        'lua': 'lua',
        'md': 'markdown',
        'irc': 'mirc',
        'nt': 'ntriples',
        'p': 'pascal',
        'pas': 'pascal',
        'pascal': 'pascal',
        'pl': 'perl',
        'php': 'php',
        'python': 'py',
        'q': 'q',
        'r': 'r',
        'rst': 'rst',
        'ruby': 'rb',
        'rs': 'rust',
        'scss': 'sass',
        'sass': 'sass',
        'scm': 'scheme',
        'sh': 'shell',
        'sieve': 'sieve',
        'smarty': 'htmlmixed',
        'sql': 'sql',
        'tcl': 'tcl',
        'tom': 'toml',
        'ttl': 'turtle',
        'vb': 'vb',
        'vbs': 'vbscript',
        'vbe': 'vbscript',
        'vm': 'velocity',
        'v': 'verilog',
        'xml': 'xml',
        'xq': 'xquery',
        'xqy': 'xquery',
        'xquery': 'xquery',
        'yaml': 'yaml',
        'z80': 'z80'
    },

    /*
     *  Get Syntax
     *
     *  Given a file extension (.js, .php), return the code mirror syntax as a string. Return
     *  empty if no match is found
     *
     *  @param {string} extension, the filename extension to query
     *  @return {string} The CodeMirror syntax if found, empty if no match
     */
    getSyntax: function(extension) {
        return (this.extensions.hasOwnProperty(extension)) ? this.extensions[extension] : '';
    },

    /*
     *  Show Supported Syntaxes
     *
     *  Method that loops through extensions map and returns a list of all the values. Will check
     *  if the syntax has already been loaded into the returned array.
     *
     *  @param {none}
     *  @return {string} A comma separated list of avaible syntax options, avoiding repitition.
     */
    showSupportedSyntaxes: function() {
        var availableOptions = [], map = this.extensions, ext;
        for (ext in this.extensions) {
            if (availableOptions.indexOf(map[ext]) === -1) {
                availableOptions.push(map[ext]);
            }
        }
        return availableOptions.join(', ');
    }
};