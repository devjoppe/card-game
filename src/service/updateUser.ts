// Firestore
import {db} from "../firebase/config.ts";
import {updateDoc, doc } from "firebase/firestore";

export const updateUser = async (gameUser:string, score:number) => {
    console.log("Update user", gameUser)
    if (gameUser) {
        const docRef = await updateDoc(
            doc(db, "highscore", gameUser),
            {
                score: score,
                complete: true
            }
        )
        console.log(docRef)
    }
}