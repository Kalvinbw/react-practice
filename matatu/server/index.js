//Server file
const listenPort = 8080;
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const deck = require('./deck');

const { addPlayer, removePlayer, getPlayer, getPlayersInRoom } = require('./players');

let rooms = [{id: 'main', players: 0}, {id: 'test', players: 0}];

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


const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    socket.on('joinRoom', ({ name, room }, callback) => {
        const {error, player} = addPlayer({id: socket.id, name, room});

        if(error) return callback(error);

        socket.join(player.room);
        socket.emit('playerJoined', {user: 'Matatu', text: `${player.name} welcome to room ${player.room}`});
        socket.broadcast.to(player.room).emit('playerJoined', {user: 'Matatu', text: `${player.name} has joined room ${player.room}`});

        io.to(player.room).emit('roomData', { room: player.room, players: getPlayersInRoom(player.room) });

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