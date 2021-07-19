//Server file
const listenPort = 8080;
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const cors = require('cors');
let express = require('express');
let path = require('path');
let app = express();
const deck = require('./deck');

//post express 4.16 use
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors());

//get the page when they go to the root directory
app.get('/', function(req,res) {
    res.sendFile(path.resolve(__dirname + '../client/build', 'index.html'));
});

app.get("/getCards", async (req, res) => {
    res.status(200).json(deck);
});

//listen on the port //the function part is a callback function
app.listen(listenPort, function() {
    console.log("listener is active on Port " + listenPort);
});

module.exports = app;