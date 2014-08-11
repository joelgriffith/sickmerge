/*
 *  Sick Server
 *
 *  Handling the web-server portion of sickmerge.
 */
module.exports = (function() {

    var express = require('express'),
        app = express(),
        path = require('path'),
        fs = require('fs'),
        open = require('open'),
        hostname, fileLocation, port, syntax, threeWayMerge, server;

    return {

        init: function(config) {
            config = config || {};
            hostname = config.hostname || 'localhost';
            fileLocation = config.location || '';
            port = config.port || 3000;
            syntax = config.syntax || '';
            threeWayMerge = config.threeWayMerge || '';

            return this;
        },

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
            open('http://' + hostname + ':' + port);
        },

        initRoutes: function() {
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

        killServer: function() {
            server.close();
            process.exit();
        }
    };
})();