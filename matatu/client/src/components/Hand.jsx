import '../styles/App.css';
import React from 'react';
import Card from './card/Card';

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            selectedCards: [],
        }
        this.handlePlay = this.handlePlay.bind(this);
        //this.componentDidUpdate = this.componentDidUpdate.bind(this);
        //this.checkHand = this.checkHand.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        console.log('get derived state called');
        if(state.selectedCards.length > 0) {
            return null;
        }
        if(props.player.turn) {
            let hand = [...props.player.cards];
            for(let i = 0; i < hand.length; i++) {
                if(hand[i].suit === props.topCard.suit ||
                    hand[i].number === props.topCard.number) {
                        hand[i].canPlay = true;
                    } else {
                        hand[i].canPlay = false;
                    }
            }
            return {cards: hand};
        } else {
            let hand = [...props.player.cards];
            for(let i = 0; i < hand.length; i++) {
                hand[i].canPlay = false;
                hand[i].selected = false;
            }
            return {cards: hand};
        }
    }

    componentDidUpdate() {
        console.log('comp did update called');
        console.log(this.props.player.playCalled);
        if(this.props.player.playCalled) {
            console.log('true');
            let cards = this.state.cards;
            for(let i = 0; i < cards.length; i++) {
                cards[i].canPlay = false;
                cards[i].selected = false;
            }
            this.handlePlay();
        }
    }

    // componentDidUpdate() {
    //     console.log('component did update called');
    // }

    handleSelect(card) {
        //Sanity Check/
        console.log('handle select clicked');
        if(!this.state.selectedCards.length > 0) {
            if(card.suit !== this.props.topCard.suit) {
                if(card.number !== this.props.topCard.number) {
                    alert('This card is not playable');
                    return;
                }
            }
        }
        

        //get variables
        let hand = [...this.state.cards];
        let selectedCards = [...this.state.selectedCards];

        //if they clicked a card already selected then remove it
        for(let i = 0; i < selectedCards.length; i++) {
            if(card.id === selectedCards[i].id) {
                selectedCards.splice(i,1);
                for(let j = 0; j < hand.length; j++) {
                    if(hand[j].id === card.id) {
                        hand[j].selected = !hand[j].selected;
                    }
                }
                this.setState({selectedCards: selectedCards}, console.log(this.state));
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
                console.log('match number found');
                hand[i].canPlay = true;
                console.log(hand[i].canPlay);
            } else {
                hand[i].canPlay = false;
            }
        }
        console.log(hand);
        this.setState({
            cards: hand,
            selectedCards: selectedCards
        }, console.log(this.state));
    }

    handlePlay() {
        console.log('handle play called from hand')
        let state = this.state;
        for(let i = 0; i < state.cards.length; i++) {
            state.cards[i].canPlay = false;
            state.cards[i].selected = false;
        }
        for(let i = 0; i < state.selectedCards.length; i++) {
            state.selectedCards[i].selected = false;
        }

        this.props.action(state.selectedCards);
        this.setState({
            cards: [],
            selectedCards: []});
    }


    render() {
        return (
            <div className='H-stack' style={{backgroundColor: '#222f49'}}>
                {this.state.cards.map((c) => (
                <Card key={c.id} show={true} card={c}
                className='Hand' handleChange={this.handleSelect}/>))}
            </div>
        );
    }
}

export default Hand;