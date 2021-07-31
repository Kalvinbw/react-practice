import '../styles/App.css';
import Header from './header/header';
import React from 'react';

function Begin(props) {
    function onClick() {
        props.handleClick()
    }

    return (
        <div>
            <Header />
            <div className='App-body'>
                <div className='H-stack'>
                    <div style={{color: "white", fontSize: 20}}>
                        <h4>Rules</h4>
                        <ul>
                            <li>Goal:</li>
                            <ul><li>Get rid of all cards in your hand</li></ul>
                            <li>Turn:</li>
                            <ul>
                                <li>Lay down cards that match either the suit or number of the card on the top of the play pile</li>
                                <li>You may lay down multiple cards as long as the number is the same on all of them</li>
                                <li>If you cannot lay down a card you must draw a card from the deck</li>
                            </ul>
                            <li>Special Cards:</li>
                            <ul>
                                <li>The 1 (Ace): Skip the next players turn</li>
                                <ul>
                                    <li>If you lay multiple then it skips the amount of people that matches how many cards you layed down</li>
                                    <li>If there are only two people then it will always be your turn next no matter how many ace's you lay</li>
                                </ul>
                                <li>The 2: Next player has to draw two (can be stacked to make them draw more)</li>
                                <li>The 10: Next player has to draw 4 (can be stacked to make them draw more)</li>
                                <li>The 8: Wild Choice</li>
                                <ul>
                                    <li>Can be played anytime during your turn</li>
                                    <li>Once layed you get to choose what the next player has to lay</li>
                                    <ul>
                                        <li>E.x. Two-of-a-kind, A four, A Heart</li>
                                    </ul>
                                    <li>You cannot demand both a suit and a number</li>
                                    <li>You must be able to meet your own demand with the cards in your hand</li>
                                </ul>
                                <li>The Joker: Wild Draw Five</li>
                                <ul><li>Can be played anytime during your turn and the next player must draw 5 (Can be stacked)</li></ul>
                            </ul>
                            <li>Winning</li>
                            <ul>
                                <li>The game ends when one person has no more cards. They are the winner</li>
                                <li>Everyone else counts their cards according to their value. Highest number = loser</li>
                                <li>Points</li>
                                <ul>
                                    <li>Joker = 100</li>
                                    <li>Ace = 50</li>
                                    <li>8 = 25</li>
                                    <li>Face Cards (11-13) = 10</li>
                                    <li>The rest are equal to the number of the card (E.x. 2 = 2, 3 = 3)</li>
                                </ul>
                            </ul>
                        </ul>
                    </div>
                    
                    <input type='button' 
                    value='Begin Game!'
                    onClick={onClick} />
                </div>
            </div>
        </div>
        
    );
}

export default Begin;