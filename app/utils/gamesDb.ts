import type { Unsubscribe } from "firebase/auth";
import { collection, query, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc, onSnapshot, where, orderBy } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

/**
 * Create a game in firebase db
 * @returns A Promise that resolve the created game
 * @throws Throws the firebase error
 */
export const createGameDb = (game:IGame) :Promise<string> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        // console.log("start createGameDb")
        game.createdAt=new Date().getTime()
        const gamesRef = collection($db as Firestore, "games")
        addDoc(gamesRef, game)
        .then((doc) => {
            resolve(doc.id)
        })
        .catch((error) => {
            // console.error("error createGameDb : ", error)
            reject(error)
        });
    })
};

/**
 * Get a game form db
 * @param id - game id
 * @returns A Promise that resolve the game
 * @throws Throws the firebase error
 */
export const getGameDb = (id:string) :Promise<IGame> => {
    return new Promise((resolve, reject) => {
        // console.log("start getGameDb id=" + id)
        const { $db } = useNuxtApp()
        const docRef = doc($db as Firestore, "games", id)

        getDoc(docRef)
        .then((doc) => {
            const game = new Game(doc)
            // console.log("end getGameDb id=" + game.id)
            resolve(game)
        })
        .catch((error) => {
            // console.error("error getGameDb : ", error)
            reject(error)
        });
    })
};

/**
 * Listen change from a game
 * @param id - game id
 * @param callback - the given callback method called on each received snapshot
 * @returns a ref to the listener to unsubscribe it
 */
export const listenGameDb = (id:string, callback:any) :Unsubscribe => {
        // console.log("start listenGameDb id=" + id)

        const { $db } = useNuxtApp()
        const docRef = doc($db as Firestore, "games", id)

        const unsub = onSnapshot(docRef,
            (doc) => {
                if(doc.exists()) {
                    const game = new Game(doc)
                    // console.log("receive listenGameDb id=" + game.id)
                    callback(game)
                }
            },
            (error) => {
                // console.error("error listenGameDb : ", error)
                callback(null)
            })
            return unsub
};

/**
 * Update the game in the db
 * @param game Update the game in db
 * @returns a Promise after game updated
 */
export const updateGameDb = (game:IGame) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start updateGameDb id=" + game.id)

        game.updatedAt = new Date().getTime()

        const { $db } = useNuxtApp()
        const docRef = doc($db as Firestore, "games", game.id)

        updateDoc(docRef, {
            started: game.started,
            ended:game.ended,
            updatedAt:game.updatedAt
        })
        .then(() => {
            resolve()
        })
        .catch((error) => {
            // console.error("error updateGameDb : ", error)
            reject(error)
        });

    })
}

/**
 * Get the games of a user
 * @param uid - the player uid
 * @returns A Promise that resolve an array of games
 * @throws Throws the firebase error
 */
export const getUserGamesDb = (uid:string) :Promise<IGame[]> => {
    return new Promise((resolve, reject) => {
        // console.log("start getUserGamesDb uid=" + uid)

        const { $db } = useNuxtApp()
        const decksRef = collection($db as Firestore, "games")
        const q = query(decksRef, where("userUid", "==", uid), orderBy("createdAt","desc"))
        getDocs(q)
        .then((listGames) => {
            const games:IGame[] = []
            listGames.forEach((gameDoc) => {
                const game:IGame = new Game(gameDoc)
                games.push(game)
            })
            // console.log("end getUserGamesDb uid=" + uid + ", nb games:" + games.length)
            resolve(games)
        })
        .catch((error) => {
            // console.error("error getUserGamesDb : ", error)
            reject(error)
        });
    })
};

/**
 * Delete the game
* @param gameId - the game id 
 * @returns A Promise that resolve after the game deleted
 * @throws Throws the firebase error
 */
export const deleteGameDb = async (gameId:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start deleteGame id:"+gameId)

        let erreur = null

        const { $db } = useNuxtApp()

        const playersRef = collection($db as Firestore, "games/" + gameId + "/players")
        const qp = query(playersRef)
        getDocs(qp).then((listPlayers) => {
            listPlayers.forEach(player => {
                    const playerRef = doc($db as Firestore, "games/" + gameId + "/players", player.id)
                    // console.log("playerRef:"+playerRef.path)
                    deleteDoc(playerRef)
            });
        })
        .catch((error) => {
            // console.error("error delete game : ", error)
            erreur = error
        });

        const decksRef = collection($db as Firestore, "games/" + gameId + "/decks")
        const qd = query(decksRef)
        
        getDocs(qd).then((listDecks) => {
            listDecks.forEach(deck => {
                const deckRef = doc($db as Firestore, "games/" + gameId + "/decks/" + deck.id)
                const ideasRef = collection($db as Firestore, "games/" + gameId + "/decks/" + deck.id + "/ideas")
                const qi = query(ideasRef)
                getDocs(qi).then((listIdeas) => {
                    listIdeas.forEach((idea) => {
                        let ideaRef = doc($db as Firestore, "games/" + gameId + "/decks/" + deck.id + "/ideas", idea.id)
                        // console.log("ideaRef:"+ideaRef.path)
                        deleteDoc(ideaRef)
                    })
                })
                .catch((error) => {
                    // console.error("error delete game : ", error)
                    erreur = error
                });
                // console.log("deckRef:"+deckRef.path)
                deleteDoc(deckRef)
            })
        })
        .catch((error) => {
            // console.error("error delete game : ", error)
            erreur = error
        });

        const gameRef = doc($db as Firestore, "games", gameId)
        // console.log("gameRef:"+gameRef.path)
        deleteDoc(gameRef)
        .catch((error) => {
            // console.error("error delete game : ", error)
            erreur = error
        });

        // console.log("end deleteGame id:"+gameId)
        if(erreur) reject (erreur)
        else resolve()
    })
};

/**
 * Get all the games
 * @param callback - the callback method
 * @returns A Promise that resolve an array of games
 * @throws Throws the firebase error
 */
export const getGamesDb = (callback:any) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start getGames")

        const { $db } = useNuxtApp()
        const gamesRef = collection($db as Firestore, "games")
        const q = query(gamesRef, orderBy("createdAt","desc"))
        getDocs(q)
        .then((listGames) => {
            const games:IGame[] = []
            listGames.forEach((gameDoc) => {
                const game:IGame = new Game(gameDoc)
                // get the user of the game
                getUserDb(game.userUid)
                .then((user) => {
                    game.user = user
                    // reload the complete list of games
                    let newGames:IGame[] = []
                    games.forEach(newGame => {
                        if(newGame.id == game.id) {
                            newGame = game
                        }
                        newGames.push(newGame)
                        callback(newGames)
                    })
                })
                .catch((error) => {
                    // console.log("error getGamesDb : " + error)
                    reject(error)
                });
                games.push(game)
            })
            callback(games)
            resolve()
            // console.log("end getGames nb games:" + games.length)
        })
        .catch((error) => {
            // console.error("error getGamesDb : ", error)
            reject(error)
        });
    })
};

/**
 * Update the game title in the db
 * @param game Update the game in db
 * @returns a Promise after game updated
 */
export const updateGameTitleDb = (game:IGame) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start updateGameTitleDb id=" + game.id)

        game.updatedAt = new Date().getTime()

        const { $db } = useNuxtApp()
        const docRef = doc($db as Firestore, "games", game.id)

        updateDoc(docRef, {
            title: game.title,
            updatedAt:game.updatedAt
        })
        .then(() => {
            resolve()
        })
        .catch((error) => {
            // console.error("error updateGameTitleDb : ", error)
            reject(error)
        });
    })
}
