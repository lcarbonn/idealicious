import { collection, doc, addDoc, getDoc, getDocs, query, onSnapshot, updateDoc, orderBy, setDoc } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const addPlayer = async (payload) => {
    console.debug("start AddPlayer player=" + payload.player.name)
    const playersRef = collection(db, "games/" + payload.gameId + "/players")
    const q = query(playersRef);
    const listOfPlayers = await getDocs(q);
    payload.player.playerId = listOfPlayers.docs.length
    const docRef = doc(db, "games/" + payload.gameId + "/players", payload.player.uid)
    await setDoc(docRef, payload.player);
    console.debug("end addPlayer id=" + payload.player.uid)
    return payload.player
};

export const getPlayer = async (payload) => {
    console.debug("start getPlayer games / " + payload.gameId + " / players", payload.playerId)
    const docRef = doc(db, "games/" + payload.gameId + "/players", payload.playerId)
    const docSnap = await getDoc(docRef)
    let player = null
    if (docSnap.exists()) {
        player = docSnap.data()
        player.id = docSnap.id
    }
    console.debug("end getPlayer games / " + payload.gameId + " / players", payload.playerId)
    return player
};

export const getNbPlayers = async (gameId) => {
    console.debug("start getNbPlayers gameId=" + gameId)
    const playersRef = collection(db, "games/" + gameId + "/players")
    const q = query(playersRef);
    const querySnapshot = await getDocs(q)
    const nbPlayers = querySnapshot.docs.length
    console.debug("end getNbPlayers gameId=" + gameId)
    return nbPlayers
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

export const updatePlayerRound = async (payload) => {
    console.debug("start updatePlayerRound id=" + payload.player.id + ", round:" + payload.player.round)
    const playerRef = doc(db, "games/" + payload.gameId + "/players", payload.player.id)
    await updateDoc(playerRef, {
        round: payload.player.round
    })
    console.debug("end updatePlayerRound id=" + payload.player.id + ", round:" + payload.player.round)
};

export const getPlayers = async (gameId) => {
    console.debug("start getPlayers gameid="+gameId)
    const ref = collection(db, "games/" + gameId + "/players")
    const q = query(ref, orderBy("playerId"));
    const docs = await getDocs(q)
    const players = []
    docs.forEach((doc) => {
        let player = doc.data()
        player.id = doc.id
        players.push(player)
    })
    console.debug("end  getPlayers: nb players="+players.length)
    return (players)
};
