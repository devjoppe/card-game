// React
import React, {useCallback, useEffect, useState} from "react";
import arrayShuffle from "array-shuffle";

// Comment data
import data from '../../data/comments.json'

// Interface
import {cardPlayed, commentType} from "../../interface/interfaces.tsx";

interface getAnswer {
    getAnswer: cardPlayed[]
}
const GameInfo:React.FC<getAnswer> = ({getAnswer}) => {

    const [startFace, setStartFace] = useState<number>(1)
    const [isShowComment, setIsShowComment] = useState(false)

    const [comments, setComments] = useState<commentType[]>([])
    const [commentType, setCommentType] = useState<string>('')

    console.log("Start face in the top: ", startFace)

    useEffect(() => {
        if(commentType) {
            const filteredComments = data.filter(comment => comment.type === commentType)
            setComments(arrayShuffle(filteredComments[0].comments))
            console.log("Comments: ", arrayShuffle(filteredComments[0].comments))
        }
    }, [commentType])

    console.log("comments outside: ", comments) //Kan inte läsa [0].title för att det inte har läst in något än...

    useEffect(() => {
        if(getAnswer.length === 2) {
            setTimeout(() => {
                if(getAnswer[0].card_id != getAnswer[1].card_id) {
                    setStartFace(2)
                    setCommentType('bad')
                    setIsShowComment(true)
                }
                if(getAnswer[0].card_id === getAnswer[1].card_id) {
                    setStartFace(3)
                    setCommentType('good')
                    setIsShowComment(true)
                }
            }, 1000)
        }
        if(getAnswer.length === 1) {
            setStartFace(1)
            setCommentType('')
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
                                { comments.length > 0 &&
                                    <div>
                                        { comments[0].title }
                                    </div>
                                 }
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