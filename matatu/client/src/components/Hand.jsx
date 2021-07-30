import '../styles/App.css';
import React from 'react';
import Card from './card/Card';

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            selectedCards: []
        }
        this.handlePlay = this.handlePlay.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.checkHand = this.checkHand.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        if(this.props.player.turn) {
            this.checkHand();
        } else {
            this.setState({cards: this.props.player.cards})
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.player.turn !== this.props.player.turn) {
            this.checkHand();
        }
    }

    checkHand() {
        let hand = [...this.props.player.cards];
        for(let i = 0; i < hand.length; i++) {
            if(hand[i].suit === this.props.topCard.suit ||
                hand[i].number === this.props.topCard.number) {
                    hand[i].canPlay = true;
                } else {
                    hand[i].canPlay = false;
                }
        }
        this.setState({cards: hand});
    }

    handleSelect(card) {
        //Sanity Check
        if(card.suit !== this.props.topCard.suit ||
            card.number !== this.props.topCard.number) {
                alert('This card is not playable');
        }

        //get variables
        let hand = this.state.cards;
        let selectedCards = this.state.selectedCards;

        //if they clicked a card already selected then remove it
        for(let i = 0; i < selectedCards.length; i++) {
            if(card.id === selectedCards[i].id) {
                selectedCards.splice(i,1);
                for(let j = 0; j < hand.length; j++) {
                    if(hand[j].id === card.id) {
                        hand[j].selected = !hand[j].selected;
                    }
                }
                this.setState({selectedCards: selectedCards});
                return;
            }
        }

        //check the hand for cards matching the one they chose
        for(let i = 0; i < hand.length; i++) {
            if(hand[i].id === card.id) {
                hand[i].selected = !hand[i].selected;
                selectedCards.push(hand[i]);
            }

            if(hand[i].number === card.number) {
                hand[i].canPlay = true;
            } else {
                hand[i].canPlay = false;
            }
        }

        this.setState({
            cards: hand,
            selectedCards: selectedCards
        });
    }

    handlePlay() {
        let state = this.state;
        for(let i = 0; i < state.cards.length; i++) {
            state.cards[i].canPlay = false;
            state.cards[i].selected = false;
        }
        for(let i = 0; i < state.selectedCards.length; i++) {
            state.selectedCards[i].selected = false;
        }

        this.props.onPlay(state.selectedCards);
    }


    render() {
        return (
            <div className='H-stack' style={{backgroundColor: '#222f49'}}>
                {this.props.player.cards.map((c) => (
                <Card key={c.id} show={true} card={c}
                className='Hand' handleChange={this.handleSelect}/>))}
            </div>
        );
    }
}

export default Hand;