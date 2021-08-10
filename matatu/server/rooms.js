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

const doPlay = (player, hand) => {
    console.log('doPlay');
    // console.log(hand);
    let gameindex = games.findIndex((room) => room.name === player.room);

    let selectedCards = hand.filter(c => c.selected);
    for(let i = 0; i < selectedCards.length; i++) {
        for(let j = 0; j < hand.length; j++) {
            hand[j].canPlay = false;
            hand[j].selected = false;
            if(selectedCards[i].id === hand[j].id) {
                console.log('match found');
                let c = hand.splice(j,1);
                //console.log(c);
                games[gameindex].playPile.push(c[0]);
            }
        }
    }
    player.cards = hand;
    player.turn = !player.turn;
    games[gameindex].players[player.index] = player;
    let nextPlayer = (games[gameindex].players.length - 1) === player.index ? 0 : player.index + 1;
    games[gameindex].players[nextPlayer].turn = true;
    return games[gameindex];
}

const drawCard = (player) => {
    console.log('doPlay');
    let g;
    for(let i = 0; i < games.length; i++) {
        if(player.room === games[i].name) {
            g = games[i];
        }
    }
    let playerIndex = g.players.findIndex(p => p.name === player.name);
    let c = g.deck.splice(g.deck.length - 1, 1);
    player.cards.push(c[0]);
    player.turn = !player.turn;
    g.players[playerIndex] = player;
    let nextPlayer = (g.players.length - 1) === playerIndex ? 0 : playerIndex + 1;
    g.players[nextPlayer].turn = true;

    return [g.players[playerIndex], g];

}

module.exports = {addRoom, doPlay, drawCard};