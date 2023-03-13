import { collection, doc, getDoc, setDoc, getDocs, updateDoc, query } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const findUser = async (uid) => {
    console.debug("start findUser =" + uid)
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)
    let user = null
    if (docSnap.exists()) {
        user = docSnap.data()
        user.id = docSnap.id
        user.updatedAt = new Date().getTime()
        await updateDoc(docRef, {
            updatedAt: user.updatedAt
        })
    }
    const message = user?user.email:user
    console.debug("end findUser =" + message)
    return user
};

export const getdUser = async (uid) => {
    console.debug("start getUser =" + uid)
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)
    let user = null
    if (docSnap.exists()) {
        user = docSnap.data()
        user.id = docSnap.id
    }
    const message = user?user.email:user
    console.debug("end getUser =" + message)
    return user
};

export const saveNewUser = async (user) => {
    console.debug("start saveNewUser user=" + user.uid)
    const docRef = doc(db, "users", user.uid)
    const newUser = {
        uid: user.uid,
        name: user.name,
        email: user.email,
        isAdmin: false,
        createdAt: new Date().getTime()
    };
    await setDoc(docRef, newUser, { merge: true });
    console.debug("end saveNewUser user" + user.uid)
    return newUser;
}

export const getUsers = async () => {
    console.debug("start getUsers")
    const ref = collection(db, "users")
    const q = query(ref);
    const snapShot = await getDocs(q)
    const users = []
    snapShot.forEach((doc) => {
        let user = doc.data()
        user.id = doc.id
        users.push(user)
    })
    console.debug("end  getUsers: nb users="+users.length)
    return (users)
}
