import type { Unsubscribe } from "firebase/auth";
import { collection, query, orderBy, getDocs, getDoc, doc, setDoc, updateDoc, onSnapshot, writeBatch } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

/**
 * Add the player in the game
 * @param gameId - the game id
 * @param player - the player
 * @returns A Promise that resolve the added Player
 * @throws Throws the firebase error
 */
export const addGamePlayerDb = (gameId:string, player:IPlayer) :Promise<IPlayer> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        // console.log("start add Player")

        // Get the list of players
        const playersRef = collection($db as Firestore, "games/" + gameId + "/players")
        const q = query(playersRef)
        getDocs(q)
        .then((listOfPlayers) => {
            let exist = false
            listOfPlayers.forEach((p) => {
                if(p.id==player.uid) {
                    exist = true
                    player.playerId = Number(p.data().playerId).valueOf()
                }
            })
            if(!exist) player.playerId = listOfPlayers.size
            // set the player
            const docRef = doc($db as Firestore, "games/" + gameId + "/players", player.uid)
            setDoc(docRef, player.toFirestore())
            .then(() => {
                resolve(player)
            })
            .catch((error) => {
                // console.error("error addGamePlayerDb :"+error)
                reject(error)
            });
        })
        .catch((error) => {
            // console.error("error addGamePlayerDb :", error)
            reject(error)
        });
    })
};

/**
 * Get a Player in the Game
 * @param gameId - the game id
 * @param playerId - Player id
 * @returns A Promise that resolve the Player
 * @throws Throws the firebase error
 */
export const getGamePlayerDb = (gameId:string, playerId:string) :Promise<IPlayer|undefined> => {
    return new Promise((resolve, reject) => {
        // console.log("start getPlayer id=" + playerId)

        const { $db } = useNuxtApp()
        const docRef = doc($db as Firestore, "games/" + gameId + "/players", playerId)

        getDoc(docRef)
        .then((doc) => {
            if(doc.exists()) {
                const player = new Player(doc)
                // console.log("end getPlayer id=" + doc.id)
                resolve(player)
            } else {
                resolve(undefined)
            }
        })
        .catch((error) => {
            // console.error("error getGamePlayerDb :", error)
            reject(error)
        });
    })
};

/**
 * Listen change from a player
 * @param id - game id
 * @param playerId - the player id
 * @param callback - the given callback method called on each received snapshot
 * @returns a ref to the listener to unsubscribe it
 */
export const listenGamePlayerDb = (gameId:string, playerId:string, callback:any) :Unsubscribe => {
    // console.log("start listenGamePlayerDb id=" + playerId)

    const { $db } = useNuxtApp()
    const docRef = doc($db as Firestore, "games/" + gameId + "/players", playerId)

    const unsub = onSnapshot(docRef,
        (doc) => {
            if(doc.exists()) {
                const player = new Player(doc)
                // console.log("receive listenGamePlayerDb id=" + player.uid)
                callback(player)
            }
        },
        (error) => {
            // console.error("error listenGamePlayerDb : ", error)
            callback(null)
        })
        return unsub
};

/**
 * Update the Player round in the db
 * @param gameId - the game id 
 * @param Player the Player
 * @returns a Promise after update
 */
export const updatePlayerRoundDb = (gameId:string, player:IPlayer) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start updatePlayer id=" + player.uid)

        const { $db } = useNuxtApp()
        const docRef = doc($db as Firestore, "games/" + gameId + "/players", player.uid)

        updateDoc(docRef, {
            round: player.round,
        })
        .then(() => {
            resolve()
        })
        .catch((error) => {
            // console.error("error updatePlayerRoundDb :", error)
            reject(error)
        });

    })
}

/**
 * Listening to the number of players in a game
 * @param gameId the game id
 * @param callback - the callback method to call on snapshot
 * @returns the unsubscribe method
 */
export const listenNbPlayersDb = (gameId:string, callback:any) : Unsubscribe => {
        // console.log("start listenNbPlayers gameId:" + gameId)

        const { $db } = useNuxtApp()
        const playersRef = collection($db as Firestore, "games/" + gameId + "/players")
        const unsub = onSnapshot(playersRef, 
            (querySnapshot) => {
                const nbPlayers = querySnapshot.docs.length
                // console.log("end listenNbPlayers gameId:" + gameId + ", nb players:"+ nbPlayers)
                callback(nbPlayers)
            },
            (error) => {
                // console.error("Error listenNbPlayers", error)
                callback(null)
            })
            return (unsub)
}

/**
 * Listening to the players in a game
 * @param gameId the game id
 * @param callback - the callback method to call on snapshot
 * @returns the unsubscribe method
 */
export const listenGamePlayersDb = (gameId:string, callback:any) : Unsubscribe => {
    // console.log("start listenGamePlayersDb gameId:" + gameId)

    const { $db } = useNuxtApp()
    const playersRef = collection($db as Firestore, "games/" + gameId + "/players")
    const unsub = onSnapshot(playersRef, 
        (querySnapshot) => {
            const players:Player[] = []
            querySnapshot.forEach((doc) => {
                const player = new Player(doc)
                players.push(player)
            })
            // console.log("end listenGamePlayersDb gameId:" + gameId + ", nb players:"+ players.length)
            callback(players)
        },
        (error) => {
            // console.error("Error listenGamePlayersDb", error)
            callback(null)
        })
        return (unsub)
}

/**
 * Get the players of a game
 * @param gameId - the game uid
 * @param callback - the callback method
 * @returns A Promise that resolve after done
 * @throws Throws the firebase error
 */
export const getPlayersDb = (gameId:string, callback:any) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start getPlayers gameId=" + gameId)

        const { $db } = useNuxtApp()
        const decksRef = collection($db as Firestore, "games/" + gameId + "/players")
        const q = query(decksRef, orderBy("playerId"))
        getDocs(q)
        .then((listPlayers) => {
            const players:IPlayer[] = []
            listPlayers.forEach((playerDoc) => {
                const player:IPlayer = new Player(playerDoc)
                // get the user of the game
                getUserDb(player.uid)
                .then((user) => {
                    player.user = user
                    // reload the complete list of games
                    let newPlayers:IPlayer[] = []
                    players.forEach(newPlayer => {
                        if(newPlayer.uid == player.uid) {
                            newPlayer = player
                        }
                        newPlayers.push(newPlayer)
                        callback(newPlayers)
                    })
                })
                players.push(player)
            })
            callback(players)
            // console.log("end getPlayers gameId=" + gameId + ", nb players:" + players.length)
            resolve()
        })
        .catch((error) => {
            // console.error("Error getPlayers game", error)
            reject(error)
        });
    })
};

/**
 * Update the Player loved in Db
 * @param gameId - the game id
 * @param playerId - the player uid
 * @param loved - boolean
 * @returns a Promise after update
 */
export const updatePlayerLoved = (gameId:string, playerId:string, loved:boolean) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start updatePlayerLoved id=" + playerId)

        const { $db } = useNuxtApp()
        const docRef = doc($db as Firestore, "games/" + gameId + "/players", playerId)

        updateDoc(docRef, {
            loved: loved,
        })
        .then(() => {
            resolve()
        })
        .catch((error) => {
            // console.error("error updatePlayerLoved :", error)
            reject(error)
        });

    })
}

/**
 * Reset all players loved
 * @param gameId the game id
 * @param players the players list
 * @returns a Promise void
 */
export const resetPlayersLovedDb = (gameId:string, players:IPlayer[]) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start resetPlayersLovesDb id=" + gameId)

        const { $db } = useNuxtApp()
        const batch = writeBatch($db as Firestore)
        players.forEach(player => {
            player.loved = false
            let ideaRef = doc($db as Firestore, "games/" + gameId + "/players", player.uid)
            batch.update(ideaRef, {
                loved: false,
            });
        });
        batch.commit()
        .then(() => {
            resolve()
        })
        .catch((error) => {
            // console.error("Error resetPlayersLovesDb", error)
            reject(error)
        });
   
    })
}
