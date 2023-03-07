import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const findUser = (uid) => {
    return new Promise((resolve, reject) => {
        console.debug("start findUser =" + uid)
        const docRef = doc(db, "users", uid)
        getDoc(docRef)
            .then(docSnap => {
                let user = null
                if (docSnap.exists()) {
                    user = docSnap.data()
                    user.id = docSnap.id
                }
                console.debug("end findUser =" + uid)
                resolve(user)
            })
            .catch(e => {
                reject(e);
            });
    })
};

export const saveNewUser = async (user) => {
    console.debug("start saveNewUser user=" + user.uid)
    const docRef = doc(db, "users", user.uid)
    const newUser = {
        uid: user.uid,
        email: user.email,
        isAdmin: false
    };
    await setDoc(docRef, newUser, { merge: true });
    console.debug("end saveNewUser user" + user.uid)
    return newUser;
}
