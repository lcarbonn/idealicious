/**
 * Add the givenPlayer in the game
 * @param gameId - the game id
 * @param uid - the player uid
 * @param name - the name of the player
 * @returns A Promise that resolve the added Player
 */
export const addGamePlayer = (gameId:string, uid:string, name:string) :Promise<IPlayer> => {
    return new Promise((resolve, reject) => {
        const player = new Player()
        player.uid = uid
        player.name = name
        addGamePlayerDb(gameId, player)
        .then((newPlayer) => {
            usePlayer().value = newPlayer
            let deck = new Deck()
            deck.id = newPlayer.playerId
            deck.playerId = newPlayer.playerId
            addGameDeck(gameId, deck)
            .then(() => {
                resolve(newPlayer)
            })
        })
        .catch((error) => {
            errorToSnack("Error adding Player to the game", error)
            reject(error)
        });
    })
}

/**
 * Check if the player has already joined the game
 * @param gameId the game id
 * @param uid the player uid
 * @returns A `Promise` will resolve with the player if in the game, undefined instead
 */
export const checkGamePlayerJoined = (gameId:string, uid:string, name?:string) :Promise<IPlayer|void> => {
    return new Promise((resolve, reject) => {
        getGamePlayer(gameId, uid)
            .then((player) => {
                // si l'utilisateur est déjà dans le jeu, on passe en mode jeu
                if(player) {
                    resolve(player)
                }
                else {
                 // si l'utilisateur est connecté, mais pas encore dans le jeu, on l'ajoute directement au jeu
                    if(name) {
                        addGamePlayer(gameId, uid, name)
                        .then((player) => {
                            resolve(player)
                        })
                    } else {
                        //sinon on affiche la saisie du nom
                        resolve()
                    }
                }
            })
            .catch((error) => {
                errorToSnack("Error check game player joined", error)
                reject(error)
            });
    
    })
}

/**
 * Get a Player in the Game
 * @param gameId - the game id
 * @param playerId - Player id
 * @returns A Promise that resolve the Player
 */
export const getGamePlayer = (gameId:string, playerId:string) :Promise<IPlayer|undefined> => {
    return new Promise((resolve, reject) => {
        getGamePlayerDb(gameId, playerId)
        .then((newPlayer) => {
            if(newPlayer) usePlayer().value = newPlayer
            resolve(newPlayer)
        })
        .catch((error) => {
            errorToSnack("Error getting Player", error)
            reject(error)
        });
    })
}

/**
 * Listen to a Player in the Game
 * @param gameId - the game id
 * @param playerId - Player id
 * @returns A Promise that resolve the Player
 */
export const listenGamePlayer = (gameId:string, playerId:string) => {
    const callback= (player:IPlayer) => {
        usePlayer().value = player
    }    

    listenGamePlayerDb(gameId, playerId, callback)
}

/**
 * Update the Player round
 * @param Player the Player
 * @returns a Promise after update
 */
export const updatePlayerRound = (gameId:string, player:IPlayer) :Promise<void> => {
    return new Promise((resolve, reject) => {
        updatePlayerRoundDb(gameId, player)
        .then(() => {
            usePlayer().value = player
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error updating player", error)
            reject(error)
        });
    })
}

/**
 * Listening to the number of players in a game
 * @param gameId the game id
 */
const listenNbPlayers = (gameId:string) => {

    const callback= (nbPlayers:number) => {
        useGameNbOfPlayers().value = nbPlayers
    }    

    listenNbPlayersDb(gameId, callback)
}


/**
 * Listening to the players in a game
 * @param gameId the game id
 */
export const listenGamePlayers = (gameId:string) => {

    const callback= (players:IPlayer[]) => {
        useGamePlayers().value = players
        useGameNbOfPlayers().value = players.length
    }    

    listenGamePlayersDb(gameId, callback)
}

/**
 * Get the players of a game
 * @param gameId - the game uid
 * @returns A Promise resolved when done
 */
export const getPlayers = (gameId:string) :Promise<void> => {
    const callback= (players:IPlayer[]) => {
        useGamePlayers().value = players
        useGameNbOfPlayers().value = players.length
    }    

    return new Promise((resolve, reject) => {
        getPlayersDb(gameId, callback)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error getting game players", error)
            reject(error)
        });

    })
}

/**
 * Player validates the loves
 * @param gameId - the game id
 * @param playerId - the player id
 * @returns a Promise after update
 */
export const validateLoves = (gameId:string, playerId:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        updatePlayerLoved(gameId, playerId, true)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error updating player loved", error)
            reject(error)
        });
    })
}

/**
 * Reset all players validates
 * @param gameId - the game id
 * @param players - the game players
 * @returns a Promise after update
 */
export const resetPlayersLoved = (gameId:string, players:IPlayer[]) :Promise<void> => {
    return new Promise((resolve, reject) => {
        resetPlayersLovedDb(gameId, players)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error updating players loved", error)
            reject(error)
        });
    })
}

/**
 * Get the next player id
 * @param playerId - the player id
 * @param nbPlayers - the total number of players
 * @returns nextPlayerId
 */
export const getNextPlayerId = (playerId:number, nbPlayers:number) :number => {
    let maxId = nbPlayers-1
    // console.log("actualPlayer:"+playerId+", maxId="+maxId)
    let nextId = playerId+1;
    if(nextId>maxId) nextId=0;
    // console.log("nextPlayer:"+nextPlayer+", maxId="+maxId)
    return nextId
}

/**
 * Get the previous player id
 * @param playerId - the player id
 * @param nbPlayers - the total number of players
 * @returns nextPlayerId
 */
export const getPreviousPlayerId = (playerId:number, nbPlayers:number) :number => {
    let maxId = nbPlayers-1
    // console.log("actualPlayer:"+playerId+", maxId="+maxId)
    let previousId = playerId-1;
    if(previousId<0) previousId=maxId;
    // console.log("nextPlayer:"+nextPlayer+", maxId="+maxId)
    return previousId
}

export const getPreviousPlayerName = (playerId:number, players:IPlayer[]) :string => {
    const previousId = getPreviousPlayerId(playerId, players.length)
    let name = ""
    players.forEach(player => {
        if(player.playerId == previousId) name = player.name
    });
    // console.log("previous name:"+name)
    return name
}

export const getPlayerName = (playerUId:string, players:IPlayer[]) :string => {
    let name = ""
    players.forEach(player => {
        if(player.uid == playerUId) name = player.name
    });
    // console.log("player name:"+playerUId+" : "+name)
    return name
}

