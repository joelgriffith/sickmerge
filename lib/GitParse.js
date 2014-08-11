/*
 *  Git Stripper
 *  Module to filter out git commit messages with three options: getYours, getTheirs, and getBoth
 */
function gitStripper() {
    this.filterTheirs = /(?:(?:<<<<<<<)|(?:=======[\S\s]*?>>>>>>>)).+\n/g;
    this.filterYours = /(?:(?:>>>>>>>)|(?:<<<<<<<[\S\s]*?=======)).*\n/g;
    this.filterAll = /(?:(?:<<<<<<<)|(?:=======)|(?:>>>>>>>)).*\n/g;
}

gitStripper.prototype.getFn = function(fileContents) {

    // See if anything is passed and it's a string
    if (!fileContents && typeof fileContents !== 'string') throw new Error('Invalid file was passed to git strip, please pass it a string.');

    return fileContents;
};

gitStripper.prototype.getYours = function(fileContents) {
    return this.getFn(fileContents).replace(this.filterTheirs, '');
};

gitStripper.prototype.getTheirs = function(fileContents) {
    return this.getFn(fileContents).replace(this.filterYours, '');
};

gitStripper.prototype.getBoth = function(fileContents) {
    return this.getFn(fileContents).replace(this.filterAll, '');
};

module.exports = gitStripper;