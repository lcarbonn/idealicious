import { collection, query, orderBy, getDocs, doc, setDoc, where, updateDoc, onSnapshot } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

/**
 * Add the given deck in the game
 * @param gameId - the game id
 * @param deck - the deck
 * @returns A Promise that resolve the added Deck
 */
export const addGameDeckDb = (gameId:string, deck:IDeck) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()
        // console.log("start add Deck")
        // set the update time
        deck.updatedAt = new Date().getTime()
        // set the deck
        const docRef = doc($db as Firestore, "games/" + gameId + "/decks", new String(deck.id).toString())
        setDoc(docRef, deck.toFirestore())
        .then(() => {
            // console.log("end add deck")
            resolve()
        })
        .catch((error) => {
            // console.error("Error creating Deck", error)
            reject(error)
        });
    })
};

/**
 * Find the Deck in the Game of the player
 * @param gameId - the game id
 * @param playerId - the player id
 * @returns A Promise that resolve the Deck
 */
export const findDeckDb = (gameId:string, playerId:number) :Promise<IDeck|undefined> => {
    return new Promise((resolve, reject) => {
        // console.log("start find Deck game=" + gameId + ", player="+playerId)

        const { $db } = useNuxtApp()
        const decksRef = collection($db as Firestore, "games/" + gameId + "/decks")
        const q = query(decksRef, where("playerId", "==", playerId), orderBy("updatedAt"))
        getDocs(q)
        .then((listDecks) => {
            //get the last one
            if(listDecks.size>0) {
            const deck = new Deck(listDecks.docs[0])
            // console.log("end find deck")
            resolve(deck)
            } else {
                resolve(undefined)
            }
        })
        .catch((error) => {
            // console.error("Error getting the deck", error)
            reject(error)
        });
    })
};

/**
 * Listen change from a deck
 * @param gameId - the game id
 * @param playerId - the player id
 * @param callback - a callback method
  */
export const listenDeckDb = (gameId:string, playerId:number, callback:any)  => {
        // console.log("start listen Deck game=" + gameId + ", player="+playerId)

        const { $db } = useNuxtApp()
        const docRef = collection($db as Firestore, "games/" + gameId + "/decks")
        const q = query(docRef, where("playerId", "==", playerId), orderBy("updatedAt"))
        const unsub = onSnapshot(q,
            (querySnapshot) => {
                if(querySnapshot.docs.length>0) {
                    const deck = new Deck(querySnapshot.docs[0])
                    // console.log("end listen deck id=" +deck.id+ " player="+deck.playerId)
                    callback(deck)
                } else {
                    callback()
                    // console.log("end listen deck no deck yet available player="+playerId)
                }
            },
            (error) => {
                // console.error("Error listening deck", error)
            })
 };

/**
 * Update the deck to the new player
 * @param gameId - the game id
 * @param deck - the deck
 * @returns A Promise that resolve after deck udpated
 */
export const sendDeckDb = (gameId:string, deck:IDeck) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()
        // console.log("start send Deck : "+deck.id+" to player:"+deck.playerId)
        // set the update time
        deck.updatedAt = new Date().getTime()
        // set the deck
        const docRef = doc($db as Firestore, "games/" + gameId + "/decks", new String(deck.id).toString())
        updateDoc(docRef, deck.toFirestore())
        .then(() => {
            // console.log("end send deck")
            resolve()
        })
        .catch((error) => {
            // console.error("Error sendDeckDb", error)
            reject(error)
        });
    })
};

/**
 * Listen decks of a game and associated ideas
 * @param gameId - the game id
 * @param sortByLove - is sorted by love requested
 * @param calldecks - the method to get last decks
 * @param callback - the method to callback on snapshot updates
 */
export const listenDecksIdeasDb = (gameId:string, sortByLove:boolean, calldecks:any, callback:any) => {
        // console.log("start listen game decks :" + gameId)

        // then start listening
        const { $db } = useNuxtApp()
        const docRef = collection($db as Firestore, "games/" + gameId + "/decks")
        const q = query(docRef, orderBy("id", "asc"));
        const unsub = onSnapshot(q,
            (querySnapshot) => {
                // first get a copy of decks
                const newDecks:[][] = []
                Object.assign(newDecks, calldecks())
                querySnapshot.docChanges().forEach((change) => {
                    // console.log("changed listenDecks: gameId :" + gameId + ", deck:" + change.doc.id)
                    // start listening deck ideas only for new deck
                    if (change.type === "added") {
                        // console.log("added deck listenDecks: gameId :" + gameId + ", deck:" + change.doc.id)
                        // add new deck
                        let ideas:[] = []
                        newDecks.push(ideas)
                        const deckId = Number.parseInt(change.doc.id)
                        // then start listening ideas of new deck
                        listenIdeasDeckDb(gameId, deckId, sortByLove, calldecks, callback)
                    }
                })
                // console.log("end listenDecks: gameId :" + gameId + ", nb deck:" + newDecks.length)
                callback(newDecks)
            },
            (error) => {
                // console.error("Error listening game decks", error)
            })
};
