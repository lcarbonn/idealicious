import { collection, doc, addDoc, getDoc, getDocs, query, onSnapshot } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'


export const getPlayer = async (callback, playerIds) => {
    console.debug("start getPlayer games / " + playerIds.gameId + " / players", playerIds.playerId)
    const docRef = doc(db, "games/" + playerIds.gameId + "/players", playerIds.playerId)
    const docSnap = await getDoc(docRef)
    let player = null
    if (docSnap.exists()) {
        player = docSnap.data()
        player.id = docSnap.id
    }
    console.debug("end getPlayer games / " + playerIds.gameId + " / players", playerIds.playerId)
    callback(player)
};

export const addPlayer = async (player) => {
    if(!player) return null
    console.debug("start AddPlayer player=" + player.name)
    const playersRef = collection(db, "games/" +player.gameId+"/players")
    const q = query(playersRef);
    const listOfPlayres = await getDocs(q);
    player.playerId = listOfPlayres.docs.length
    const ref = await addDoc(playersRef, player)
    player.id = ref.id
    console.debug("end addPlayer id=" + player.id)
    return player
};

export const listenNbPlayers = async (callback, gameId) => {
    console.debug("start listenNbPlayers gameId=" + gameId)
    const playersRef = collection(db, "games/" + gameId + "/players")
    const q = query(playersRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const nbPlayers = querySnapshot.docs.length
        console.debug("end listenNbPlayers gameId=" + gameId)
        callback(nbPlayers)
    });
};

