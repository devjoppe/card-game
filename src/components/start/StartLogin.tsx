// React
import React, {useState} from "react";

// Firestore
import { db } from '../../firebase/config.ts'
import {collection, addDoc} from "firebase/firestore";

interface IProp {
    getUser: (userId:string) => void
}

const StartLogin:React.FC<IProp> = ({getUser}) => {

    const [userName, setUserName] = useState('')

    const saveUser = async () => {
        if(userName) {
            const docRef = await addDoc(collection(db, 'highscore'), {
                user: userName,
                score: 0,
                complete: false
            })
            console.log("My doc ref is: ", docRef.id)
            getUser(docRef.id)
        }
        return
    }

    return(
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                saveUser().then(() => {console.log("Is it done?")})
                setUserName('')
            }}>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} required placeholder="Enter username" />
                <span className="info">Username must be over 3 characters long</span>
                <button type="submit" className="start" disabled={userName.length < 3}>Start game</button>
            </form>
        </div>
    )
}

export default StartLogin