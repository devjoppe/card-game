import React, {useEffect, useState} from "react";
import {cardPlayed} from "../../interface/interfaces.tsx";

interface getAnswer {
    getAnswer: cardPlayed[]
}
const GameInfo:React.FC<getAnswer> = ({getAnswer}) => {

    const [startFace, setStartFace] = useState<number>(1)
    const [isShowComment, setIsShowComment] = useState(false)

    console.log("Start face in the top: ", startFace)

    useEffect(() => {
        if(getAnswer.length === 2) {
            console.log("GET ANSWER: ", getAnswer)
            setTimeout(() => {
                if(getAnswer[0].card_id != getAnswer[1].card_id) {
                    setStartFace(2)
                    setIsShowComment(true)
                    console.log("StartFace FAIL: ", startFace)
                }
                if(getAnswer[0].card_id === getAnswer[1].card_id) {
                    setStartFace(3)
                    setIsShowComment(true)
                    console.log("StartFace CORRECT: ", startFace)
                }
            }, 1000)
        }
        if(getAnswer.length === 1) {
            setStartFace(1)
            setIsShowComment(false)
        }
    }, [getAnswer, startFace])

    return(
        <div className="game-bar">
            <h1>Peep card game</h1>
            <div className="game-info">
                <div className="peep">
                    <div>
                        {startFace === 1 && <img src="../../src/assets/images/character/peep_default.png" alt="peep" /> }
                        {startFace === 2 && <img src="../../src/assets/images/character/peep_incorrect.png" alt="peep" /> }
                        {startFace === 3 && <img src="../../src/assets/images/character/peep_correct.png" alt="peep" /> }
                    </div>
                    { isShowComment &&
                        <>
                            <div className="comment-dash"></div>
                            <div className="comment">
                                This is my comment!
                            </div>
                        </>
                    }
                </div>
                <div className="user-score">
                    USER SCORE
                </div>
            </div>
        </div>
    )
}

export default GameInfo