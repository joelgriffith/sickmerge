/*
 *  Dependencies
 */
var CodeMirrorMerge = require('code-mirror/addon/merge'),
    CodeMirrorLoadMode = require('code-mirror/addon/mode/loadmode'),
    CodeMirror = require('code-mirror'),
    xhr = require('./ajax.js'),

    // Getting text from the browser
    syntax = document.getElementById('syntax-mode'),
    yoursText = document.getElementById('yours-value').innerHTML,
    theirsText = document.getElementById('theirs-value').innerHTML,
    bothText = document.getElementById('both-value').innerHTML,
    codeMirrorEl = document.getElementById('git-diff'),

    // Button DOM
    saveBtn = document.getElementById('save-file'),
    mergeYoursBtn = document.getElementById('merge-yours'),
    mergeTheirsBtn = document.getElementById('merge-theirs'),
    hideDiffBtn = document.getElementById('hide-diff'),
    cancelBtn = document.getElementById('cancel'),

    // Flags/Normalizing
    mode = (syntax) ? syntax.innerHTML : null,
    syntaxLib = (mode) ? require('code-mirror/mode/' + mode + '.js') : '',
    hilight = true;


/*
 *  3-Way setup
 */
var mergeView = new CodeMirror.MergeView(codeMirrorEl, {
    value: bothText,
    origLeft: yoursText,
    origRight: theirsText,
    highlightDifferences: hilight,
    smartIndent: true,
    theme: 'solarized-dark',
    mode: mode,
    lineNumbers: true
});

/*
 *  Button Functionality
 */
saveBtn.onclick = function() {
    var finalFile = { content: mergeView.edit.getValue() };
    xhr({
        url: '/save',
        type: 'POST',
        data: finalFile,

        // TODO: Abstract this out and error handling
        done: function (err, response) {
            if (err) {
                alert(err);
            } else {
                window.close();
            }
        }
    }); 
};
mergeYoursBtn.onclick = function() {
    mergeView.edit.setValue(mergeView.leftOriginal().doc.getValue());
};
mergeTheirsBtn.onclick = function() {
    mergeView.edit.setValue(mergeView.rightOriginal().doc.getValue());
};
hideDiffBtn.onclick = function() {
    mergeView.setShowDifferences(hilight = !hilight);   
};
cancelBtn.onclick = function() {
    xhr({
        url: '/cancel',

        // TODO: Abstract this out
        done: function () {
            window.close();
        }
    }); 
};