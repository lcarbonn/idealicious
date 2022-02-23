import { collection, doc, addDoc, getDoc, getDocs, query, where, onSnapshot } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'


export const getPlayer = async (callback, id) => {
    console.debug("start getPlayer id=" + id)
    const docRef = doc(db, "players", id)
    const docSnap = await getDoc(docRef)
    let player = null
    if (docSnap.exists()) {
        player = docSnap.data()
        player.id = docSnap.id
    }
    console.debug("end getPlayer id=" + id)
    callback(player)
};

export const addPlayer = async (player) => {
    if(!player) return null
    console.debug("start AddPlayer player=" + player.name)
    const playersRef = collection(db, "players")
    const q = query(playersRef, where("gameId", "==", player.gameId));
    const querySnapshot = await getDocs(q);
    player.playerId = querySnapshot.docs.length
    const ref = await addDoc(playersRef, player)
    player.id = ref.id
    console.debug("end addPlayer id=" + player.id)
    return player
};

export const getNbPlayers = async (callback, gameId) => {
    console.debug("start getNbPlayers gameId=" + gameId)
    const playersRef = collection(db, "players")
    const q = query(playersRef, where("gameId", "==", gameId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const nbPlayers = querySnapshot.docs.length
        console.debug("end getNbPlayers gameId=" + gameId)
        callback(nbPlayers)
    });
};

