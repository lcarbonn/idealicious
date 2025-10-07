/**
 * Create a idea in firebase db
 * @returns A Promise that resolve the created idea id
 * @throws Throws the error
 */
export const addIdea = (gameId:string, deckId:number, idea:IIdea) :Promise<string> => {
    return new Promise((resolve, reject) => {
        addIdeaDb(gameId, deckId, idea)
        .then((id) => {
            idea.id = id
            resolve(id)
        })
        .catch((error) => {
            errorToSnack("Error creating idea", error)
            reject(error)
        });
    })
}

/**
 * Find the last idea of a deck
 * @param gameId - the game id
 * @param deckId - the deck id
 * @returns A Promise that resolve the idea or undefined
 * @throws Throws the error
 */
export const getLastIdea = (gameId:string, deckId:number) :Promise<IIdea|undefined> => {
    return new Promise((resolve, reject) => {
            getLastIdeaDb(gameId, deckId)
            .then((idea) => {
                useLastIdea().value = idea
                resolve(idea)
            })
            .catch((error) => {
                errorToSnack("Error getting the last idea", error)
                reject(error)
            })
    })
}

/**
 * Update the  number of loves for a idea
 * @param gameId the game id
 * @param uid the player id
 * @param deckId the deck id
 * @param ideaId the idea id
 * @param isLoved the new love
 * @returns a Promise resolved after udpate
 * @throws Throws the error
 */
export const updateIdeaLoves = (gameId:string, uid:string, deckId:number, ideaId:string, isLoved:boolean) :Promise<void> => {
    return new Promise((resolve, reject) => {
        updateIdeaLovesDb(gameId, uid, deckId, ideaId, isLoved)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error updateIdeaLoves", error)
            reject(error)
        });
    })
}

/**
 * Reset all ideas loves
 * @param gameId the game id
 * @returns a Promise void
 */
export const resetIdeasLoves = (gameId:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const ideas = useDecksWithIdeas().value

        resetIdeasLovesDb(gameId, ideas)
        .then((ideas) => {
            useDecksWithIdeas().value = ideas
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error resetIdeasLoves", error)
            reject(error)
        });
    })
}