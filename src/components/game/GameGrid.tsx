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
        console.log("Checking answer", playedCard)
        if(playedCard.length === 2) {
            //Not the correct answer:
            if(playedCard[0] != playedCard[1]) {
                setTimeout(() =>
                    setCardDeck(current => current.map(card => {
                        if(!card.complete) {
                            return {...card, isFlipped: false}
                        }
                        return card
                    })), 3000)
            }
            // If the correct answer


            setTimeout(() => {
                setWrongAnswer(true)
                setCorrectAnswer(false)
            }, 1000)

            setCount(0)
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



    const handleCard = (idNumber:number|undefined, cardId:number) => {

        console.log("Card ID--------> ", idNumber, cardId)
        console.log("Count--------> ", count)

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
    //console.log("CardDeck: ", cardDeck)
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
                        <div className={`flip-card ${card.isFlipped ? 'flipped': 'not-flipped'}`} data-card={card.card_id} onClick={() => {handleCard(card.id, card.card_id); card.isFlipped = true}}>
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
