// Firestore Database
import { db } from '../../firebase/config.ts'
import {getDocs, collection } from "firebase/firestore";

// React
import {useEffect, useState} from "react";
import arraySort from "array-sort"

// Interface
import {highScoreList} from "../../interface/interfaces.tsx";

const StartHighScore = () => {

    const [data, setData] = useState<highScoreList[]|null>(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setIsPending(true)
        const getData = async () => {
            const querySnapshot = await getDocs(collection(db, "highscore"));
            console.log(querySnapshot)
            if(querySnapshot.empty) {
                setError('There is no highscore yet')
                setIsPending(false)
            } else {
                const dataHighScore:highScoreList[] = []
                querySnapshot.forEach((doc) => {
                    dataHighScore.push({id: doc.id, user: doc.data().user, score: doc.data().score, complete: doc.data().complete})
                });
                console.log("My data highScore: ", dataHighScore)
                setData(arraySort(dataHighScore, 'score'))
            }
        }
        getData().then(() => {
            setIsPending(false)
            console.log("Data was collected")
        }).catch(err => {
            console.error(err.message)
            setError(err.message)
            setIsPending(false)
        })
    },[])

    let counter = 0

    return(
        <div className="list">
            {error && <span>{error}</span>}
            {isPending && <span>Loading...</span>}
            {data &&
                <>
                <div className="sub-title">
                    <span className="sub">Username</span>
                    <span className="sub">Turns</span>
                </div>
                { data.filter(item => item.complete).map((item, index) => {
                    counter++
                    if(counter && counter <= 10) {
                        return <div className="score-item" key={index}>
                            <span>{item.user}</span>
                            <span>{item.score}</span>
                        </div>
                    }
                })}
                </>
            }
        </div>
    )
}

export default StartHighScore