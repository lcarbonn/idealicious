import { doc, getDoc } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const getUser = (email) => {
    return new Promise((resolve, reject) => {
        console.debug("start getUser email=" + email)
        const docRef = doc(db, "users", email)
        const docSnap = getDoc(docRef)
            .then(docSnap => {
                let user = null
                if (docSnap.exists()) {
                    user = docSnap.data()
                    user.id = docSnap.id
                }
                console.debug("end getUser email=" + email)
                resolve(user)
            })
            .catch(e => {
                reject(e);
            });
    })
};
