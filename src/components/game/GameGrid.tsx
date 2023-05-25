// React
import React, {useCallback, useEffect, useState} from "react";

// Interface
import {gameCards, cardPlayed} from "../../interface/interfaces.tsx";

interface gameCardsProps {
    gameCards: gameCards[],
    setCheckAnswer: (data: cardPlayed[]) => void,
    playAgain: boolean
}

const GameGrid:React.FC<gameCardsProps> = ({gameCards, setCheckAnswer, playAgain}) => {

    const [cardDeck, setCardDeck] = useState<gameCards[]>([])
    const [playedCard, setPlayedCard] = useState<cardPlayed[]>([])
    const [count, setCount] = useState(0)

    const [wrongAnswer, setWrongAnswer] = useState<boolean>(false)

    // Setting up game start
    useEffect(() => {
        setCardDeck(gameCards)
    }, [gameCards, playAgain])

    useEffect(() => {
        setCheckAnswer(playedCard)
    }, [setCheckAnswer, playedCard])

    const checkAnswer = useCallback(() => {
        // Handles the cards and check if they are the same
        if(playedCard.length === 2) {
            //Not the correct answer:
            if(playedCard[0].card_id != playedCard[1].card_id) {
                setTimeout(() => {
                    setCount(0)
                    setCardDeck(current => current.map(card => {
                        if(!card.complete) {
                            return {...card, isFlipped: false}
                        }
                        return card
                    }))}, 3000)
                setTimeout(() => {
                    setWrongAnswer(true)
                }, 1000)
            }
            // If the correct answer
            if(playedCard[0].card_id === playedCard[1].card_id) {
               // Set the cards to complete and flipped
                setWrongAnswer(false)
                setCardDeck(current => current.map(card => {
                    playedCard.map(played => {
                        if (played.card_id === card.card_id) {
                            card.isFlipped = true
                            card.complete = true
                            return {...card}
                        }
                    })
                    return card
                }))
                setTimeout(() => {
                    setCount(0)
                }, 1000)
            }
            setPlayedCard([])
        }
    },[playedCard])

    // Check if count is 2 and then execute
    useEffect(() => {
        if(count === 2) {
            checkAnswer()
        }
    }, [count, checkAnswer])

    const handleCard = (idNumber:number|undefined, cardId:number, complete:boolean) => {
        // Check if the card has already being played?
        if(complete) {
            return
        }

        // Save played cards
        if(idNumber && cardId) {
            setPlayedCard(current => current.concat({id: idNumber, card_id: cardId}))
        }
        setWrongAnswer(false)
        // Set counter for every click
        setCount(current => current + 1)
    }

    return(
        <div className="grid">
            {cardDeck.map((card) => (
                <div key={card.id}>
                    <div className={`flip-card ${card.isFlipped ? 'flipped': 'not-flipped'}`}
                         data-card={card.card_id}
                         onClick={() => {
                             if(count < 2 && !card.isFlipped) {
                                 handleCard(card.id, card.card_id, card.complete);
                                 card.isFlipped = true
                             }
                             return
                         }}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src="../src/assets/images/card-front.png" alt="gamecard" />
                            </div>
                            <div className={`${wrongAnswer && !card.complete && `incorrect`} flip-card-back`}>
                                <img src={`../src/assets/images/cards/${card.url}`} alt="gamecard" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GameGrid
