import React, {useCallback, useEffect, useState} from "react";

// Interface
import {gameCards, cardPlayed} from "../../interface/interfaces.tsx";

interface gameCardsProps {
    gameCards: gameCards[]
    setCheckAnswer: (data: cardPlayed[]) => void
}

const GameGrid:React.FC<gameCardsProps> = ({gameCards, setCheckAnswer}) => {

    const [cardDeck, setCardDeck] = useState<gameCards[]>([])
    const [playedCard, setPlayedCard] = useState<cardPlayed[]>([])
    const [count, setCount] = useState(0)

    const [wrongAnswer, setWrongAnswer] = useState<boolean>(false)
    //const [correctAnswer, setCorrectAnswer] = useState<boolean>(false)

    // Todo: This one is new: When clicked, set new state, send it to game and then to gameInfo
    //const [isAnswer, setIsAnswer] = useState<boolean|null>(null)

    useEffect(() => {
        setCardDeck(gameCards)
    }, [gameCards])

    useEffect(() => {
        setCheckAnswer(playedCard)
    }, [setCheckAnswer, playedCard])

    const checkAnswer = useCallback(() => {

        //console.log("Checking answer", playedCard)

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
                //console.log("Running Complete code...")
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
        console.log("COUNT IS RUNNING", count)
        if(count === 2) {
            checkAnswer()
        }
    }, [count, checkAnswer])

    const handleCard = (idNumber:number|undefined, cardId:number, complete:boolean) => {

        //console.log("Card ID--------> ", idNumber, cardId)
        //console.log("Count--------> ", count)

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

    //console.log("Played cards: ", playedCard)
    //console.log("CardDeck: ", cardDeck)
    //console.log("Count: ", count)
    //console.log("Played Card OUTSIDE: ", playedCard)

    return(
        <div className="grid">
            {cardDeck.map((card) => (
                <div key={card.id}>
                    <div className={`flip-card ${card.isFlipped ? 'flipped': 'not-flipped'}`}
                         data-card={card.card_id}
                         onClick={() => {
                             if(count < 2) {
                                 handleCard(card.id, card.card_id, card.complete);
                                 card.isFlipped = true
                             }
                             return
                         }}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src="../src/assets/images/card-front.png" alt="gamecard" />
                                {card.card_id}
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
