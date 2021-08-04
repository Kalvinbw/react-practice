//Server file
const listenPort = 8080;
const cors = require('cors');
const express = require('express');
const app = express();
//const server = require('http').createServer(app);
const socket = require('socket.io');
const path = require('path');
const deck = require('./deck');

//app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors());

//get the page when they go to the root directory
app.get('/', function(req,res) {
    res.sendFile(path.resolve(__dirname + '../client/build', 'index.html'));
});

app.get("/getCards", async (req, res) => {
    res.status(200).json(deck);
});

//listen on the port //the function part is a callback function
let server = app.listen(listenPort, function() {
    console.log("listener is active on Port " + listenPort);
});

const io = socket(server);
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    socket.emit('connection');
})



module.exports = app;