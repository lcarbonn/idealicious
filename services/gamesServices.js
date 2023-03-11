import { collection, doc, addDoc, getDoc, getDocs, updateDoc, onSnapshot, query, deleteDoc, where } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const addGame = async (game) => {
    if (!game) return null
    console.debug("start addGame title=" + game.title)
    game.createdAt=new Date().getTime()
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
    game.updatedAt = new Date().getTime()
    const gameRef = doc(db, "games", game.id)
    await updateDoc(gameRef, {
        started: game.started,
        ended:game.ended,
        updatedAt:game.updatedAt
    })
    console.debug("end updateGameStatus id=" + game.id + ", started:" + game.started + ", ended:" + game.ended)
};

export const getGames = async () => {
    console.debug("start getGames")
    const gamesRef = collection(db, "games")
    const q = query(gamesRef);
    const gamesSnapshot = await getDocs(q)
    const games = []
    gamesSnapshot.forEach((gameSnap) => {
        let game = gameSnap.data()
        game.id = gameSnap.id
        games.push(game)
    })
    console.debug("end  getGames: nb games="+games.length)
    return (games)
};

export const deleteGame = async (id) => {
    console.debug("start deleteGame id="+id)
    await deleteDoc(doc(db, "games", id));
    console.debug("end  deleteGame id="+id)
};

export const getUserGames = async (callback, uid) => {
    console.debug("start getUserGames uid="+uid)
    const gamesRef = collection(db, "games")
    const q = query(gamesRef, where("userUid", "==", uid));
    onSnapshot(q, (gamesSnapshot) => {
        const games = []
        gamesSnapshot.forEach((gameSnap) => {
            let game = gameSnap.data()
            game.id = gameSnap.id
            games.push(game)
        })
        console.debug("end  getUserGames: nb games="+games.length)
        callback(games)
    });
};
