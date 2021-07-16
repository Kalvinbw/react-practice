//Server file
const listenPort = 8080;
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
let express = require('express');
let path = require('path');
let app = express();

class Card {
    constructor(sui, nam, num, abil, v) {
        this.suit = sui;
        this.name = nam;
        this.number = num;
        this.ability = abil;
        this.value = v
    }
}

class Deck {
    constructor(cardArray) {
        this.cards = cardArray;
        this.discardPile = [];
        this.drawPile = [];
    }

    shuffle() {

    }

    split() {

    }

    discard(c) {
        for (let i = 0; i < c.length; i++) {
            this.discardPile.push(c[i]);
            this.cards.splice();
        }
    }
}

function makeDeck() {
    let suits = ['Heart', 'Spade', 'Club', 'Diamond'];
    let names = ['Ace', 'Jack', 'Queen', 'King', 'Joker'];
    let ability = ['Draw 2', 'Draw 4', 'Draw 5', 'Skip Turn', 'Wild'];
    let values = [25, 50, 100];

    let cardAr = [];
    //create all the cards
    for(let i=0; i<suits.length; i++) {
        let sui = suits[i];
        let num;
        let val;
        let abil;
        let nam;
        for(let j=1; j<14; j++) {
            num = j;
            switch(num) {
                case 1:
                    nam = names[0];
                    val = values[0];
                    abil = ability[3];
                    break;
                case 2:
                    nam = toString(num);
                    val = num;
                    abil = ability[0];
                    break;
                case 8:
                    nam = toString(num);
                    val = values[1];
                    abil = ability[4];
                    break;
                case 10:
                    nam = toString(num);
                    val = num;
                    abil = ability[1];
                    break;
                case 11:
                    nam = names[1];
                    val = num;
                    abil = null;
                    break;
                case 12:
                    nam = names[2];
                    val = num;
                    abil = null;
                    break;
                case 13:
                    nam = names[3];
                    val = num;
                    abil = null;
                    break;
                default:
                    nam = toString(num);
                    val = num;
                    abil = null;
                    break;
            } //end switch
            let c = new Card(sui, nam, num, abil, val);
            cardAr.push(c);
        }
    }

    //create the joker cards
    for(let i = 0; i < 2; i++) {
        let c = new Card('Joker', names[4], 0, ability[2], values[2]);
        cardAr.push(c);
    }

    let deck = new Deck(cardAr);
    return [deck, cardAr];
}

let d = makeDeck();
d = d[1];
console.log(d[40].suit);
//post express 4.16 use
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../client/build')));

//get the page when they go to the root directory
app.get('/', function(req,res) {
    res.sendFile(path.resolve(__dirname + '../client/build', 'index.html'));
});

app.get("/getCards", (req, res) => {
    res.send({data: d}    );
});

//listen on the port //the function part is a callback function
app.listen(listenPort, function() {
    console.log("listener is active on Port " + listenPort);
});
