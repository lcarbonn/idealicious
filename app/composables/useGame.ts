/**
 * Delete game in stated games list
 * @param gameId - the game id
 */
const deleteStatedGame = (gameId:string) => {
    let games:IGame[] =  []
    const oldGames = useGames().value
    if(oldGames) {
        oldGames.forEach((oldGame) => {
            if(oldGame.id != gameId) {
                games.push(oldGame)
            }
        })
    }
    useGames().value = games
}

/**
 * Create a game
 * @returns A Promise that resolve the created game
 * @throws Throws the firebase error
 */
export const createGame = (game:IGame) :Promise<string> => {
    return new Promise((resolve, reject) => {
        // console.log("start createGame game=" + game.title)
        // reset all previous stated
        useGame().value = undefined
        usePlayer().value = undefined
        createGameDb(game).then((id) => {
            game.id = id
            resolve(id)
        })
        .catch((error) => {
            errorToSnack("Error create game", error)
            reject(error)
        });
    })
}
/**
 * Get a game
 * @param id - game id
 * @returns A Promise that resolve the game
 * @throws Throws the firebase error
 */
export const getGame = (id:string) :Promise<IGame> => {
    return new Promise((resolve, reject) => {
        // console.log("start getGame id=" + id)
        getGameDb(id).then((game) => {
            useGame().value = game
            // console.log("end getGame id=" + game.id)
            resolve(game)
        })
        .catch((error) => {
            errorToSnack("Error get game", error)
            reject(error)
        });
    })
}

/**
 * Listen change from a game
 * @param id - game id
 */
export const listenGame = (id:string) => {
    const setStateGame= (game:IGame) => {
        // console.log("use game changed=" + game?.id)
        useGame().value = game
    }    
    // console.log("start listenGame id=" + id)
    listenGameDb(id, setStateGame)
}

/**
 * Update the game in the db
 * @param game Update the game in db
 * @returns A Promise that resolve when udpated
 */
export const updateGame = (game:IGame) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start updateGame id=" + game?.id)
        
        updateGameDb(game).then(() => {
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error updateGame", error)
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
export const getUserGames = (uid:string) :Promise<IGame[]> => {
    return new Promise((resolve, reject) => {
        // console.log("start getUserGames uid=" + uid)

        getUserGamesDb(uid)
        .then((games) => {
            useGames().value = games
            // console.log("end getUserGames uid=" + uid + ", nb games:" + games.length)
            resolve(games)
        })
        .catch((error) => {
            errorToSnack("Error getUserGames", error)
            reject(error)
        });
    })
};

/**
 * Delete the game
 * @param gameId - the game id
 * @returns A Promise that resolve after deletion completed
 * @throws Throws the firebase error
 */
export const deleteGame = async (gameId:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start deleteGame id:"+gameId)
        deleteGameDb(gameId)
        .then(() => {
            useGame().value = undefined
            deleteStatedGame(gameId)
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error deleteGame", error)
            reject(error)
        });
    })
}

/**
 * Get all the games
 */
export const getGames = () => {
    //callback method
    const setStateGames= (games:IGame[]) => {
        //console.log("use games changed nb games=" + games?.length)
        useGames().value = games
    }    
    getGamesDb(setStateGames)
}

/**
 * Update the game title
 * @param game Update the game
 * @returns A Promise that resolve when udpated
 */
export const updateGameTitle = (game:IGame) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start updateGameTitle id=" + game?.id)
        
        updateGameTitleDb(game).then(() => {
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error updateGameTitle", error)
            reject(error)
        });
    })
}
