/* inbuilt modules */
const path = require('path');

/* npm modules */
const express = require('express');

/* express instance */
const app = express();
const port = process.env.PORT || 5001;
const mongoURL = 'mongodb://localhost:27017/cr';

const server = app.listen(port, function() {
	console.log("Chain Reaction server active at port: " + port + ".");
});

// mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => console.log(`Connected to database at ${mongoURL}.`));

exports.server = server; // export server for socket handler

app.use(express.json()); // allow receiving json data
app.use(express.urlencoded({ extended: true })); // allow receiving urlencoded data

app.use('/', express.static('./game'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'game', 'index.html'));
});

app.get('/play', function(req, res) {
	res.sendFile(path.join(__dirname, 'game', 'play.html'));
});

require('./handler').io; // start socket.io