import { collection, doc, addDoc, getDoc } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'


export const getGame = async (callback, id) => {
    const docRef = doc(db, "games", id)
    const docSnap = await getDoc(docRef)
    let game = null
    if (docSnap.exists()) {
        game = docSnap.data()
        game.id = docSnap.id
    }
    callback(game)
};

export const addGame = async (game) => {
    const ref = await addDoc(collection(db, "games"), game)
    game.id = ref.id
    console.log("added Game id=" + game.id)
    return game
};
