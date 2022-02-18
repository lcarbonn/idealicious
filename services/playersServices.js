import { collection, doc, addDoc, getDoc } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'


export const getPlayer = async (callback, id) => {
    const docRef = doc(db, "players", id)
    const docSnap = await getDoc(docRef)
    let player = null
    if (docSnap.exists()) {
        player = docSnap.data()
        player.id = docSnap.id
    }
    callback(player)
};

export const addPlayer = async (player) => {
    const ref = await addDoc(collection(db, "players"), player)
    player.id = ref.id
    console.log("added player id=" + player.id)
    return player
};
