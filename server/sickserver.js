var env = require('../lib/config')(),
    express = require('express'),
    app = express(),
    path = require('path'),
    fs = require('fs'),
    open = require('open');

module.exports = function(config) {
    var hostname = config.hostname || 'localhost',
        fileLocation = config.location,
        port = config.port || 3000,
        syntax = config.syntax || '',
        threeWayMerge = config.threeWayMerge;

    // Web server setup
    app.use(express.bodyParser());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, 'public')));

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
        var content = req.body.content;
        fs.writeFile(fileLocation, content, function (err) {
            if (err) throw "There was an issues saving your file: " + err;
            res.send('complete');
            process.exit();
        });
    });

    // Get route for cancelling the file (this is final) and closes the process
    app.get('/cancel', function (req, res) {
        res.send('terminated');
        process.exit();
    });

    console.log(
        'Sickmerge is waiting for changes.\n' +
        'Visit http://' + hostname + ':' + port + '/ in your browser to make changes\n' +
        'Pressing "Save" or "Cancel" will do the action and close the sickmerge program.\n'+
        'Press CTRL+C if you\'ve closed your web browser and didn\'t click either of those buttons.'
    );
    app.listen(port);
    if( env !== 'test') open('http://' + hostname + ':' + port);
};