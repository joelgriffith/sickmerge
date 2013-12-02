module.exports = {
    extensionMap: {
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
    getSyntax: function(extension) {
        return (this.extensionMap.hasOwnProperty(extension)) ? this.extensionMap[extension] : '';
    },
    showSupportedSyntaxes: function() {
        var availableOptions = [], map = this.extensionMap, ext;
        for (ext in this.extensionMap) {
            if (availableOptions.indexOf(map[ext]) === -1) {
                availableOptions.push(map[ext]);
            }
        }
        return availableOptions.join(', ');
    }
};