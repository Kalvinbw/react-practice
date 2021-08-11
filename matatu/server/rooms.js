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
    //find the game
    let gameindex = games.findIndex((room) => room.name === player.room);

    //filter out the selected cards
    let selectedCards = hand.filter(c => c.selected);
    let ability = false;
    for(let i = 0; i < selectedCards.length; i++) {
        ability = selectedCards[i].ability !== false;
        for(let j = 0; j < hand.length; j++) {
            hand[j].canPlay = false;
            hand[j].selected = false;
            if(selectedCards[i].id === hand[j].id) {
                let c = hand.splice(j,1);
                //push the selected cards to the play pile
                games[gameindex].playPile.push(c[0]);
            }
        }
    }
    //give the hand to the player
    player.cards = hand;
    games[gameindex].players[player.index] = player;
    if(ability) {
        let g = handleAbility(player, games[gameindex], selectedCards);
        return g;
    } else {
        player.turn = !player.turn;
        let nextPlayer = (games[gameindex].players.length - 1) === player.index ? 0 : player.index + 1;
        games[gameindex].players[nextPlayer].turn = true;
    }
    return games[gameindex];
}

const handleAbility = (player, game, cards) => {
    let g = game;
    switch(cards[0].ability) {
        case 'Draw 2':
          g = drawExtra(player, game, 2, cards);
          break;
        case 'Draw 4':
          g = drawExtra(player, game, 4, cards);
          break;
        case 'Draw 5':
          g = drawExtra(player, game, 5, cards);
          break;
        case 'Skip Turn':
          g = skipTurn(cards, players);
          break;
        // case 'Wild':
        //   this.wildCard(cards, players, id);
        //   break;
        default:
          return -1;
    }
    return g;
}

function drawExtra(player, game, drawAmount, cards) {
    let nextPlayer = (game.players.length - 1) === player.index ? 0 : player.index + 1;
    for(let i = 0; i < cards.length; i++) {
        let extra = game.deck.splice(0, drawAmount);
        game.players[nextPlayer].cards.push(...extra);
    }
    game.players[player.index].turn = false;
    game.players[nextPlayer].turn = true;
    return game
}

function skipTurn(player, game, cards) {
    if(game.players.length <= 2) {
        return game;
    }
    let id = player.index;
    for(let i = 1; i <= cards.length; i++) {
        id = (id === (game.players.length - 1)) ? 0 : (id + 1);
    }
    game.players[player.index].turn = false;
    game.players[id].turn = true;
    return game;
}

const drawCard = (player) => {
    console.log('draw card');
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