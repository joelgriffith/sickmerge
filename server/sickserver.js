/*
 *  Sick Server
 *
 *  Module for handling the web-server portion of sickmerge.
 *  This module is an AMD-ish style object so we can store
 *  some private variables and what not.
 */
module.exports = (function() {

    // Local/private vars
    var env = require('../lib/config')(),
        express = require('express'),
        app = express(),
        path = require('path'),
        fs = require('fs'),
        open = require('open'),
        hostname, fileLocation, port, syntax, threeWayMerge, server;

    return {

        /*
         *  Init
         *
         *  Set's up the private variables with defaults if none are passed
         *
         *  @param config {object} Server options object
         *  @return this {object} Return this keyword to chain
         */
        init: function(config) {
            config = config || {};
            hostname = config.hostname || 'localhost';
            fileLocation = config.location || '';
            port = config.port || 3000;
            syntax = config.syntax || '';
            threeWayMerge = config.threeWayMerge || '';

            return this;
        },

        /*
         *  Start Server
         *
         *  Method to start the http server, assumes you've already 
         *  ran config beforehand (will throw an error otherwise)
         *
         *  @param {none}
         *  @return {none}
         */
        startServer : function() {
            // Web server setup
            app.use(express.bodyParser());
            app.set('views', __dirname + '/views');
            app.set('view engine', 'ejs');
            app.use(express.static(path.join(__dirname, 'public')));

            this.buildRoutes();

            console.log(
                'Sickmerge is waiting for changes.\n' +
                'Visit http://' + hostname + ':' + port + '/ in your browser to make changes\n' +
                'Pressing "Save" or "Cancel" will do the action and close the sickmerge program.\n'+
                'Press CTRL+C if you\'ve closed your web browser and didn\'t click either of those buttons.'
            );
            server = app.listen(port);
            if( env !== 'test') open('http://' + hostname + ':' + port);
        },

        /*
         *  Build Routes
         *
         *  Abstraction for building the web server routes. Might move into
         *  it's own file at somepoint.
         *
         *  @param {none}
         *  @return {none}
         */
        buildRoutes: function() {
            var me = this;

            // Build the base route for the page
            app.get('/', function (req, res) {
                res.render('editor', { 
                    title: fileLocation, 
                    syntax: syntax,
                    body: threeWayMerge 
                });
            });

            // Post route for saving the file (this is final) and closes the process
            app.post('/save', function (req, res) {
                var content = req.body.content || null;
                fs.writeFile(fileLocation, content, function (err) {
                    if (err) throw "There was an issue saving your file: " + err;
                    res.send('complete');
                    me.closeServer();
                });
            });

            // Get route for cancelling the file (this is final) and closes the process
            app.get('/cancel', function (req, res) {
                res.send('terminated');
                me.closeServer();
            });
        },

        /*
         *  Close Server
         *
         *  Abstraction for closing the webserver and terminating the process.
         *
         *  @param {none}
         *  @return {none}
         */
        closeServer: function() {
            server.close();
            if (env !== 'test') process.exit();
        }
    };
})();