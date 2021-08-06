//Server file
const listenPort = 8080;
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');

const {makeDeck} = require('./deck');
const { addPlayer, removePlayer, getPlayer, getPlayersInRoom } = require('./players');
const {addRoom} = require('./rooms');

//app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors());

//get the page when they go to the root directory
app.get('/', function(req,res) {
    res.sendFile(path.resolve(__dirname + '../client/build', 'index.html'));
});

app.get("/getCards", async (req, res) => {
    let d = makeDeck();
    res.status(200).json(d);
});

//listen on the port //the function part is a callback function
let server = app.listen(listenPort, function() {
    console.log("listener is active on Port " + listenPort);
});


const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    socket.on('joinRoom', ({ name, room }, callback) => {
        let Player = addPlayer({id: socket.id, name, room});
        if(Player instanceof Error) return callback(error);
        
        let d = makeDeck()
        let Room = addRoom(Player, room, d);

        socket.join(Room.name);
        // socket.emit('playerJoined', {user: 'Matatu', text: `${Player.name} welcome to room ${Player.room}`});
        // socket.broadcast.to(Room.name).emit('playerJoined', {user: 'Matatu', text: `${Player.name} has joined room ${Player.room}`});

        socket.emit('playerData', Player);
        io.to(Room.name).emit('roomData', Room);

        callback();
    });

    socket.on('callPlay', () => {
        socket.emit('playCalled');
    });

    socket.on('disconnect', () => {
        const user = removePlayer(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'Matatu', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getPlayersInRoom(user.room)});
        }
    })
})



module.exports = app;