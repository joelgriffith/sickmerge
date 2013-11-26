/*
 *  Git Strip
 *
 *  Given a string of the conflicted file, return
 *  3 files options (your version, theirs, and the merge) as well as
 *  the titles for each (HEAD, has, remote...) file.
 *
 *  @param fileText {string} The text to parse out git conflict messages
 *  @param mergeResult {string} Optional, a string representing what to show in the middle column
 *         on instantiation.
 *  @return {Object} Object with the results plus the Git title (HEAD, remote...) specifying where
 *          the merge is taking place
 */

module.exports = function(fileText, initialView) {

    // See if anything is passed and it's a string
    if (!fileText && typeof fileText !== String) return new Error('Invalid file was passed to git strip, please pass it a string.');

    // See if an initialView is passed, if not set to 'yours'
    if (!initialView) initialView = 'theirs';

    var gitStripper = {
        stripTheirs: /(?:(?:<<<<<<<)|(?:=======[\S\s]*?>>>>>>>)).+\n/g,
        stripYours: /(?:(?:>>>>>>>)|(?:<<<<<<<[\S\s]*?=======)).*\n/g,
        stripAll: /(?:(?:<<<<<<<)|(?:=======)|(?:>>>>>>>)).*\n/g,
        yours: function (fileContents) {
            return fileContents.replace(this.stripTheirs, '');
        },
        theirs: function (fileContents) {
            return fileContents.replace(this.stripYours, '');
        },
        both: function (fileContents) {
            return fileContents.replace(this.stripAll, '');
        }
    };
    return {
        localTitle: 'Local',
        incomingTitle: 'Incoming',
        yours: gitStripper.yours(fileText),
        theirs: gitStripper.theirs(fileText),
        merge: gitStripper[initialView](fileText)
    };
};