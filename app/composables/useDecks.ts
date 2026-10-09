/**
 * Add the given deck in the game
 * @param gameId - the game id
 * @param deck - the deck
 * @returns A Promise that resolve when deck added
 */
export const addGameDeck = (gameId:string, deck:IDeck) :Promise<void> => {
    return new Promise((resolve, reject) => {
        addGameDeckDb(gameId, deck)
        .then(() => {
            useDeck().value = deck
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error creating Deck", error)
            reject(error)
        })
    })
}

/**
 * Find the Deck in the Game of the player
 * @param gameId - the game id
 * @param playerId - the player id
 * @returns A Promise that resolve the Deck
 */
export const findDeck = (gameId:string, playerId:number) :Promise<IDeck|undefined> => {
    return new Promise((resolve, reject) => {
        findDeckDb(gameId, playerId)
        .then((deck)=>{
            useDeck().value = deck
            resolve(deck)
        })
        .catch((error) => {
            errorToSnack("Error find deck", error)
            reject(error)
        })
    })
}

/**
 * Listen change from a deck
 * @param gameId - the game id
 * @param playerId - the player id
 */
export const listenDeck = (gameId:string, playerId:number) => {
    const callback= (deck:IDeck) => {
        if(deck) {
            useDeck().value = deck
            getLastIdea(gameId, deck.id)
        } else {
            useDeck().value = undefined
            useLastIdea().value = undefined
        }
    }

    listenDeckDb(gameId, playerId, callback)
}

/**
 * Update the deck to the new player
 * @param gameId - the game id
 * @param deck - the deck
 * @returns A Promise that resolve after deck udpated
 */
export const sendDeck = (gameId:string, deck:IDeck) :Promise<void> => {
    return new Promise((resolve, reject) => {
        sendDeckDb(gameId, deck)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error send Deck", error)
            reject(error)
        });
    })
}

/**
 * Listen decks of a game and associated ideas
 * @param gameId - the game id
 */
export const listenDecksIdeas = (gameId:string) => {
    // reset cache
    useDecksWithIdeas().value = []

    const calldecks= () :IIdea[][] => {
        return useDecksWithIdeas().value
    }

    const callback= (decks:IIdea[][]) => {
        useDecksWithIdeas().value = decks
    }

    listenDecksIdeasDb(gameId, false, calldecks, callback)
}

/**
 * Listen decks of a game and associated ideas sorted by loves
 * @param gameId - the game id
 */
export const listenDecksIdeasSorted = (gameId:string) => {
    // reset cache
    useDecksWithIdeasSorted().value = []

    const calldecks= () :IIdea[][] => {
        return useDecksWithIdeasSorted().value
    }

    const callback= (decks:IIdea[][]) => {
        useDecksWithIdeasSorted().value = decks
    }

    listenDecksIdeasDb(gameId, true, calldecks, callback)
}

/**
 * Send the deck to the next player in the game
 * @param gameId - the game id
 * @param deck -the deck to send
 * @param player - the actual player of the deck
 * @param nbPlayers - the total number of players
 */
export const sendDeckToNextPlayer = (gameId:string, deck:IDeck, player:IPlayer, nbPlayers:number) => {
    // console.log("send deck :"+deck.id+" to next player current is : " + deck.playerId)
    const nextPlayerId = getNextPlayerId(deck.playerId, nbPlayers)
    // console.log("send deck :"+deck.id+" to next player next is : " + nextPlayerId)
    deck.playerId = nextPlayerId
    sendDeck(gameId, deck)
    .then(() => {
        // update player round
        player.round++
        updatePlayerRound(gameId, player)
    })
  }
