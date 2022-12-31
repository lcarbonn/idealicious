import { collection, doc, addDoc, getDoc, getDocs, query, onSnapshot, updateDoc, orderBy } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const addPlayer = async (player) => {
    if (!player) return null
    console.debug("start AddPlayer player=" + player.name)
    const playersRef = collection(db, "games/" + player.gameId + "/players")
    const q = query(playersRef);
    const listOfPlayers = await getDocs(q);
    player.playerId = listOfPlayers.docs.length
    const ref = await addDoc(playersRef, player)
    player.id = ref.id
    console.debug("end addPlayer id=" + player.id)
    return player
};

export const getPlayer = async (playerIds) => {
    console.debug("start getPlayer games / " + playerIds.gameId + " / players", playerIds.playerId)
    const docRef = doc(db, "games/" + playerIds.gameId + "/players", playerIds.playerId)
    const docSnap = await getDoc(docRef)
    let player = null
    if (docSnap.exists()) {
        player = docSnap.data()
        player.id = docSnap.id
    }
    console.debug("end getPlayer games / " + playerIds.gameId + " / players", playerIds.playerId)
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

export const updatePlayerRound = async (player) => {
    if (!player) return null
    console.debug("start updatePlayerRound id=" + player.id + ", round:" + player.round)
    const playerRef = doc(db, "games/" + player.gameId + "/players", player.id)
    await updateDoc(playerRef, {
        round: player.round
    })
    console.debug("end updatePlayerRound id=" + player.id + ", round:" + player.round)
};

export const getPlayers = async (callback, gameId) => {
    console.debug("start getPlayers gameid="+gameId)
    const gamesRef = collection(db, "games/" + gameId + "/players")
    const q = query(gamesRef, orderBy("playerId"));
    const unsubd = onSnapshot(q, (gamesSnapshot) => {
        const players = []
        gamesSnapshot.forEach((playerSnap) => {
            let player = playerSnap.data()
            player.id = playerSnap.id
            players.push(player)
        })
        console.debug("end  getPlayers: nb players="+players.length)
        callback(players)
    });
};
