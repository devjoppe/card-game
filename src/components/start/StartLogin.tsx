import {useState} from "react";

import { db } from '../../firebase/config.ts'
import {collection, addDoc} from "firebase/firestore";

const StartLogin = () => {

    const [userName, setUserName] = useState('')

    const saveUser = async () => {
        console.log(userName)
        if(userName) {
            await addDoc(collection(db, 'highscore'), {
                user: userName,
                score: 0
            })
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
                <button type="submit" className="start">Start game</button>
            </form>
        </div>
    )
}

export default StartLogin