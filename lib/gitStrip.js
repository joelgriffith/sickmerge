/*
 *  Git Strip
 *
 *  Given a string of the conflicted file, return
 *  3 files (in an array) of the conflicted file.
 *  The first is the local version (HEAD), the second is
 *  the bare file with both edits (might need changing), and the last is the 
 *  file being merged (master, commit...)
 *
 *  @param fileText {string} The text to parse out git conflict messages
 *  @param mergeResult {string} Optional, a string representing what to show in the middle column
 *         on instantiation.
 */
module.exports = function(fileText, initialView) {
    
    // Regex for generating the files to diff
    var stripTheirs = /(?:(?:<<<<<<<)|(?:=======[\S\s]*?>>>>>>>)).+\n/g,
        stripYours = /(?:(?:>>>>>>>)|(?:<<<<<<<[\S\s]*?=======)).*\n/g,
        // Removes all the git comments
        stripAll = /(?:(?:<<<<<<<)|(?:=======)|(?:>>>>>>>)).*\n/g;

    var stripFunctions = {
        yours: function (fileContents) {
            return fileContents.replace(stripTheirs, '');
        },
        theirs: function (fileContents) {
            return fileContents.replace(stripYours, '');
        },
        both: function (fileContents) {
            return fileContents.replace(stripAll, '');            
        }
    };
    return [stripFunctions.yours(fileText), stripFunctions[initialView](fileText), stripFunctions.theirs(fileText)];
};