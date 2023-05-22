import React, {useCallback, useEffect, useState} from "react";

// Interface
import {gameCards, cardPlayed} from "../../interface/interfaces.tsx";

interface gameCardsProps {
    gameCards: gameCards[]
}

const GameGrid:React.FC<gameCardsProps> = ({gameCards}) => {

    const [cardDeck, setCardDeck] = useState<gameCards[]>([])
    const [playedCard, setPlayedCard] = useState<cardPlayed[]>([])
    const [count, setCount] = useState(0)

    const [wrongAnswer, setWrongAnswer] = useState<boolean>(false)
    const [correctAnswer, setCorrectAnswer] = useState<boolean>(false)

    useEffect(() => {
        setCardDeck(gameCards)
    }, [gameCards])

    const checkAnswer = useCallback(() => {

        // Check if the cards is completed/already played
        // Todo: Code this with a 2 Foreach?

        console.log("Checking answer", playedCard)
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
                    setCorrectAnswer(false)
                }, 1000)
            }
            // If the correct answer
            if(playedCard[0].card_id === playedCard[1].card_id) {
               // Set the cards to complete and flipped
                console.log("Running Complete code...")
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
                    setWrongAnswer(false)
                    setCorrectAnswer(true)
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

        console.log("Card ID--------> ", idNumber, cardId)
        console.log("Count--------> ", count)

        // Check if the card has already being played?
        if(complete) {
            return
        }

        setWrongAnswer(false)
        setCorrectAnswer(false)

        // Save played cards
        if(idNumber && cardId) {
            setPlayedCard(current => current.concat({id: idNumber, card_id: cardId}))
        }
        // Set counter for every click
        setCount(current => current + 1)
    }

    //console.log("Played cards: ", playedCard)
    console.log("CardDeck: ", cardDeck)
    console.log("Count: ", count)
    console.log("Played Card OUTSIDE: ", playedCard)

    return(
        <>
            <div className="answer">
                {wrongAnswer && <div className="answer-item incorrect">Wrong answer, have another go!</div>}
                {correctAnswer && <div className="answer-item correct">Nice, you picked the same cards!</div>}
            </div>
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
                                </div>
                                <div className="flip-card-back">
                                    <img src={`../src/assets/images/cards/${card.url}`} alt="gamecard" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default GameGrid
