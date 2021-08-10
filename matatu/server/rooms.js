const { addPlayer, removePlayer, getPlayer, getPlayersInRoom } = require('./players');

let games = [];

const addRoom = (player, roomName, deck) => {
    let d = [...deck];
    let index = games.findIndex((room) => room.name === roomName);
    //console.log(index);
    
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
        //console.log(playDeck);
        let room = {name: roomName, players: [player], deck: d, playPile: playDeck};
        games.push(room);
        //console.log(room.playPile);
        return room;

    }
}

const doPlay = (player, selectedCards) => {
    let g = games.filter(g => g.name === player.room);
    console.log(player);
    let playerIndex = g.players.findIndex(p => p.name === player.name);
    for(let i = 0; i < selectedCards.length; i++) {
        for(let j = 0; j < player.hand; j++) {
            player.hand[j].canPlay = false;
            player.hand[j].selected = false;
            if(selectedCards[i].id === player.hand[j].id) {
                let c = player.hand.splice(j,1)
                g.playPile.push(c[0]);
            }
        }
    }
    player.turn = !player.turn;
    g.players[playerIndex] = player;
    g.players[playerIndex + 1].turn = true;

    return [g.players[playerIndex], g];
}

module.exports = {addRoom, doPlay};