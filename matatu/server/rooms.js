const { addPlayer, removePlayer, getPlayer, getPlayersInRoom } = require('./players');

let games = [];

const addRoom = (player, roomName, deck) => {
    let d = [...deck];
    let index = games.findIndex((room) => room.name === roomName);
    console.log(index);
    
    if(games.length !== 0 && index !== -1) {
        if(games[index].players.length >= 8) {
            return {error: "Room is full"};
        }
    }

    if(index !== -1) {
        player.index = games[index].players.length
        player.cards = games[index].deck.splice(0,4);
        games[index].players.push(player);
        //console.log(player.cards);
        return games[index];

    } else if(index === -1) {
        player.index = 0;
        playDeck = d.splice(0,1);
        player.cards = d.splice(0,4);
        player.turn = true;
        console.log(playDeck);
        let room = {name: roomName, players: [player], deck: d, playPile: playDeck};
        games.push(room);
        console.log(room.playPile);
        return room;

    }
}

module.exports = {addRoom};