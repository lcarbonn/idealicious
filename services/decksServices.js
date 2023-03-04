import { collection, doc, setDoc, onSnapshot, query, where, Timestamp, orderBy, updateDoc, getDocs } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const addDeck = async (payload) => {
    console.debug("start addDeck:" + payload.deck.id)
    const deckRef = doc(db, "games/" + payload.gameId + '/decks', new String(payload.deck.id))
    payload.deck.updateTime = Timestamp.fromDate(new Date()),
    await setDoc(deckRef, payload.deck)
    console.debug("end addDeck:" + payload.deck.id)
    return payload.deck
};

export const listenDeck = async (callback, payload) => {
    console.debug("start listenDeck playerId=" + payload.playerId)
    const decksRef = collection(db, "games/" + payload.gameId + "/decks")
    const q = query(decksRef, where("playerId", "==", payload.playerId), orderBy("updateTime"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docSnap = querySnapshot.docs[0]
        let newDeck = null
        if (docSnap) {
            newDeck = docSnap.data()
            newDeck.id = docSnap.id
        }
        if (newDeck) console.debug("end listenDeck playerId=" + payload.playerId + ", newDeck:" + newDeck.id)
        else console.debug("end listenDeck playerId=" + payload.playerId + ", newDeck:" + newDeck)
        callback(newDeck)
    })
};

export const getDeck = async (callback, payload) => {
    console.debug("start getDeck playerId=" + payload.playerId)
    const decksRef = collection(db, "games/" + payload.gameId + "/decks")
    const q = query(decksRef, where("playerId", "==", payload.playerId), orderBy("updateTime"))
    const querySnapshot = await getDocs(q)
        const docSnap = querySnapshot.docs[0]
        let newDeck = null
        if (docSnap) {
            newDeck = docSnap.data()
            newDeck.id = docSnap.id
        }
    if (newDeck) console.debug("end getDeck playerId=" + payload.playerId + ", newDeck:" + newDeck.id)
    else console.debug("end getDeck playerId=" + payload.playerId + ", newDeck:" + newDeck)
    callback(newDeck)
};

export const sendDeck = async (payload) => {
    console.debug("start sendDeck id=" + payload.deck.id + ", playerId:" + payload.deck.playerId)
    const deckRef = doc(db, "games/" + payload.gameId + "/decks", new String(payload.deck.id))
    await updateDoc(deckRef, {
        updateTime: Timestamp.fromDate(new Date()),
        playerId: payload.deck.playerId
    })
    console.debug("end sendDeck id=" + payload.deck.id + ", playerId:" + payload.deck.playerId)
};

