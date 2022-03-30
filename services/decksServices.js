import { collection, doc, setDoc, onSnapshot, query, where, Timestamp, orderBy, updateDoc, getDocs } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const addDeck = async (deck) => {
    if (!deck) return null
    console.debug("start addDeck:" + deck.id)
    const deckRef = doc(db, "games/" + deck.gameId + '/decks', new String(deck.id))
    deck.updateTime = Timestamp.fromDate(new Date()),
    await setDoc(deckRef, deck)
    console.debug("end addDeck:" + deck.id)
    return deck
};

export const listenDeck = async (callback, deck) => {
    console.debug("start listenDeck playerId=" + deck.playerId)
    const decksRef = collection(db, "games/" + deck.gameId + "/decks")
    const q = query(decksRef, where("playerId", "==", deck.playerId), orderBy("updateTime"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docSnap = querySnapshot.docs[0]
        let newDeck = null
        if (docSnap) {
            newDeck = docSnap.data()
            newDeck.id = docSnap.id
        }
        if (newDeck) console.debug("end listenDeck playerId=" + deck.playerId + ", newDeck:" + newDeck.id)
        else console.debug("end listenDeck playerId=" + deck.playerId + ", newDeck:" + newDeck)
        callback(newDeck)
    })
};

export const getDeck = async (callback, deck) => {
    console.debug("start getDeck playerId=" + deck.playerId)
    const decksRef = collection(db, "games/" + deck.gameId + "/decks")
    const q = query(decksRef, where("playerId", "==", deck.playerId), orderBy("updateTime"))
    const querySnapshot = await getDocs(q)
        const docSnap = querySnapshot.docs[0]
        let newDeck = null
        if (docSnap) {
            newDeck = docSnap.data()
            newDeck.id = docSnap.id
        }
    if (newDeck) console.debug("end getDeck playerId=" + deck.playerId + ", newDeck:" + newDeck.id)
    else console.debug("end getDeck playerId=" + deck.playerId + ", newDeck:" + newDeck)
    callback(newDeck)
};

export const sendDeck = async (deck) => {
    if (!deck) return null
    console.debug("start sendDeck id=" + deck.id + ", playerId:" + deck.playerId)
    const deckRef = doc(db, "games/" + deck.gameId + "/decks", new String(deck.id))
    await updateDoc(deckRef, {
        updateTime: Timestamp.fromDate(new Date()),
        playerId: deck.playerId
    })
    console.debug("end sendDeck id=" + deck.id + ", playerId:" + deck.playerId)
};

