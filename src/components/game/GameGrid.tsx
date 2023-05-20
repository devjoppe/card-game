import React, {useEffect, useState} from "react";

// Interface
import {gameCards} from "../../interface/interfaces.tsx";

interface gameCardsProps {
    gameCards: gameCards[]
}

const GameGrid:React.FC<gameCardsProps> = ({gameCards}) => {

    const [cardDeck, setCardDeck] = useState<gameCards[]>([])
    const [playedCard, setPlayedCard] = useState<number>(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        setCardDeck(gameCards)
    }, [gameCards])

    const flipCard = (id:number|undefined, cardId:number) => {

        console.log("Card ID: ", cardId, id)
        console.log("Count: ", count)

        //setPlayedCard(cardId)
        setCount(count + 1)

        if(count === 2) {
            if(playedCard != cardId) {
                // Alla som INTE har completed true, set isFlipped to false -> efter 2 sek

                setCardDeck(current => current.map(card => {
                    if(!card.complete) {
                        return {...card, isFlipped: false}
                    }
                    return card
                }))
                setCount(0)
            }
        }
    }

    console.log("Played cards: ", playedCard)
    console.log("CardDeck: ", cardDeck)

    return(
        <div className="grid">
            {cardDeck.map((card) => (
                <div key={card.id}>
                    <div className={`flip-card ${card.isFlipped ? 'flipped': 'not-flipped'}`} data-card={card.card_id} onClick={() => {flipCard(card.id, card.card_id); card.isFlipped = true}}>
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
    )
}

export default GameGrid
