import { collection, doc, addDoc, getDoc, getDocs, query, where, onSnapshot } from "firebase/firestore"
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
    const playersRef = collection(db, "players")
    const q = query(playersRef, where("gameId", "==", player.gameId));
    const querySnapshot = await getDocs(q);
    player.playerId = querySnapshot.docs.length
    const ref = await addDoc(playersRef, player)
    player.id = ref.id
    console.log("added player id=" + player.id)
    return player
};

export const getNbPlayers = async (callback, gameId) => {
    const playersRef = collection(db, "players")
    const q = query(playersRef, where("gameId", "==", gameId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const nbPlayers = querySnapshot.docs.length
        callback(nbPlayers)
    });
};

