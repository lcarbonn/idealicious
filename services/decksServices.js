import { collection, doc, setDoc, onSnapshot, query, where, limit, updateDoc, getDocs } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const addDeck = async (deck) => {
    if (!deck) return null
    console.debug("start addDeck:" + deck.id)
    const deckRef = doc(db, "games/" + deck.gameId + '/decks', new String(deck.id))
    await setDoc(deckRef, deck)
    console.debug("end addDeck:" + deck.id)
    return deck
};

export const listenDeck = async (callback, deck) => {
    console.debug("start listenDeck playerId=" + deck.playerId)
    const decksRef = collection(db, "games/" + deck.gameId + "/decks")
    const q = query(decksRef, where("playerId", "==", deck.playerId), limit(1))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docSnap = querySnapshot.docs[0]
        let newDeck = null
        if (docSnap) {
            newDeck = docSnap.data()
            newDeck.id = docSnap.id
        }
        console.debug("end listenDeck playerId=" + deck.playerId +", newDeck:"+newDeck)
        callback(newDeck)
    })
};

export const getDeck = async (callback, deck) => {
    console.debug("start getDeck playerId=" + deck.playerId)
    const decksRef = collection(db, "games/" + deck.gameId + "/decks")
    const q = query(decksRef, where("playerId", "==", deck.playerId), limit(1))
    const querySnapshot = await getDocs(q)
        const docSnap = querySnapshot.docs[0]
        let newDeck = null
        if (docSnap) {
            newDeck = docSnap.data()
            newDeck.id = docSnap.id
        }
        console.debug("end listenDeck playerId=" + deck.playerId + ", newDeck:" + newDeck)
        callback(newDeck)
};

export const sendDeck = async (deck) => {
    if (!deck) return null
    console.debug("start sendDeck id=" + deck.id + ", playerId:" + deck.playerId)
    const deckRef = doc(db, "games/" + deck.gameId + "/decks", deck.id)
    await updateDoc(deckRef, {
        playerId: deck.playerId
    })
    console.debug("end sendDeck id=" + deck.id + ", playerId:" + deck.playerId)
};

