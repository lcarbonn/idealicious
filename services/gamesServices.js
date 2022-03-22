import { collection, doc, addDoc, getDoc, updateDoc, onSnapshot } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const addGame = async (game) => {
    if (!game) return null
    console.debug("start addGame title=" + game.title)
    const ref = await addDoc(collection(db, "games"), game)
    game.id = ref.id
    console.debug("end addGame id=" + game.id)
};

export const getGame = async (callback, id) => {
    console.debug("start getGame id=" + id)
    const docRef = doc(db, "games", id)
    const docSnap = await getDoc(docRef) 
    let game = null
    if (docSnap.exists()) {
        game = docSnap.data()
        game.id = docSnap.id
    }
    console.debug("end getGame id=" + id)
    callback(game)
};

export const listenGame = async (callback, id) => {
    console.debug("start listenGame id=" + id)
    const docRef = doc(db, "games", id)
    const unsub = onSnapshot(docRef, (docSnap) => {
        let game = null
        if (docSnap.exists()) {
            game = docSnap.data()
            game.id = docSnap.id
        }
        console.debug("end listenGame id=" + id)
        callback(game)
    })
};

export const updateGameStatus = async (game) => {
    if(!game) return null
    console.debug("start updateGameStatus id=" + game.id + ", started:" + game.started + ", ended:"+game.ended)
    const gameRef = doc(db, "games", game.id)
    await updateDoc(gameRef, {
        started: game.started,
        ended:game.ended
    })
    console.debug("end updateGameStatus id=" + game.id + ", started:" + game.started + ", ended:" + game.ended)
};
