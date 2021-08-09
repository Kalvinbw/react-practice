import '../styles/App.css';
import React, {useState, useEffect} from 'react';
import Card from './Card';

const Hand = (props) => {
    const [hand, setHand] = useState([]);

    //update playable cards on turn
    useEffect(() => {
        let hand = props.player.cards;
        console.log(props.player);
        console.log(props.topCard);
        let tc = props.topCard;
        if(props.player.turn) {
            let h = checkCanPlay(hand, tc);
            setHand(h);
        } else {
            hand.forEach(c => {
                c.canPlay = false;
                c.selected = false;
            });
            setHand(hand);
        }
    }, [props.player, props.player.cards, props.player.turn, props.topCard, props.topCard.number, props.topCard.suit]);

    const handleSelect = (card) => {
        //Sanity Check
        if(!card.canPlay) {
            alert('This card is not playable');
            return;
        }

        let handCopy = [...hand];
        for(let i = 0; i < handCopy.length; i++) {
            //if they chose a selected card, unselect it
            if(card.id === handCopy[i].id && handCopy[i].selected) {
                handCopy[i].selected = !handCopy[i].selected;
                setHand(handCopy);
            } 
            //if they chose a playable card
            else if(card.id === handCopy[i].id && handCopy[i].canPlay) {
                //select the card
                handCopy[i].selected = !handCopy[i].selected;
                let hc = checkCanPlay(handCopy, handCopy[i]);
                setHand(hc);
            } 
            //they did not chose a playable card
            else {
                alert(`Sorry, you can't play that card`);
            }
            
        }
    }

    const checkCanPlay = (array, checkCard) => {
        console.log('check card');
        console.log(array);
        console.log(checkCard);
        //if joker is on top, any card is playable
        let ar = [...array];
        if(checkCard.number === 0) {
            for(let i = 0; i < ar.length; i++) {
                ar[i].canPlay = true;
            }
            return ar;
        }

        //check which cards are playable
        for(let i = 0; i < ar.length; i++) {
            if(ar[i].suit === checkCard.suit ||
                ar[i].number === checkCard.number || 
                ar[i].number === 8 || ar[i].number === 0) {
                    ar[i].canPlay = true;
                } else {
                    ar[i].canPlay = false;
                }
        }

        return ar;
    }

    return (
        <div className="H-stack" style={{backgroundColor: '#222f49'}}>
             {hand.map((c) => (
            <Card key={c.id} show={true} card={c}
            className='Hand' handleChange={handleSelect}/>
        ))}
        </div>
    )
}

export default Hand