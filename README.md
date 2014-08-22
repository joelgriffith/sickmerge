# Single-Page Application Build
Your one-stop shop for a single-page application build that includes the following:

The good stuff
- SASS -> CSS building with minification in distribution phase
- JavaScript bundling. Understands ES6, AMD, and CommonJs
- Human-readable dev build and production-ready dist build.
- The option to use NPM OR Bower for your front-end package manager
- A "watch" operation that utilizes live-reload for pushing hot content
- Image compression for distribution

The nice-to-haves
- A .editorconfig and .jshint file with some initialization to get you started
- A stubbed out .gitignore to bootstrap things up
- An archive of the project with no GIT information, so you can do whatever you want VCS-wise

## Getting Started
You'll need the following installed to make this whole build operational:

### Required:
- Node.js, NPM, and gulp.

### Optional:
- JSHint
- Bower
- A zip utility to unarchive the latest.zip

## Building
If you're familiar with this sort of a thing, just clone this repo and run `npm install` in the root directory. You're ready to go.

If not, here is the play-by-play:

- In command line, run `git clone https://github.com/joelgriffith/spa-build.git` in a folder of your choosing
- Then (again in the command line), run `cd spa-build && npm install`
- OPTIONAL: If you want to use this bootstrap of sorts without the git information from cloning, there is a `latest.zip` that is an archive of the project, minus the `.git/` folder
- You're ready to code!

## More specifically
The build process utilizies numerous packages and optimizations from the NPM/Gulp community. Many thanks to all of those packages!
If you'd like to make changes, feel free to see the mostly annoted build code in `gulpfile.js` which includes all the information you'll need. Make changes as you see fit.
To that end, most of the build operations look for a manifest of some sort, this is either in the`src/js/index.js` or `src/scss/index.scss`. Include whatever modules/code in there and they'll be built out into one file.