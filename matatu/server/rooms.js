const { addPlayer, removePlayer, getPlayer, getPlayersInRoom } = require('./players');

let games = [];

const addRoom = (player, roomName, deck) => {
    let d = [...deck];
    let index = games.indexOf((room) => room.name === roomName);

    if(index !== -1) {
        player.index = games[index].players.length
        player.cards = games[index].deck.splice(0,4);
        games[index].players.push(player);
        return games[index];

    } else if(index === -1) {
        player.index = 1;
        console.log(d.length);
        playDeck = d.pop();
        console.log(d.length);
        player.cards = d.splice(0,4);
        console.log(d.length);
        player.turn = true;
        console.log(playDeck);
        let room = {name: roomName, players: [player], deck: d, playPile: [playDeck]};
        games.push(room);
        return room;

    } else if(games[index].players.length >= 8) {
        return {error: "Room is full"};
    }
}

module.exports = {addRoom};