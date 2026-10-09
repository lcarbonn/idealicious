import { collection, query, orderBy, getDocs, doc, updateDoc, addDoc, onSnapshot, increment, writeBatch, arrayUnion, arrayRemove } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

/**
 * Create a idea in firebase db
 * @returns A Promise that resolve the created idea id
 * @throws Throws the firebase error
 */
export const addIdeaDb = (gameId:string, deckId:number, idea:IIdea) :Promise<string> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        // console.log("start create Idea ="+idea.message)
        idea.createdAt=new Date().getTime()
      
        const ideasRef = collection($db as Firestore, "games/" + gameId + "/decks/" + deckId + "/ideas")
        addDoc(ideasRef, idea.toFirestore())
        .then((doc) => {
            resolve(doc.id)
        })
        .catch((error) => {
            // console.error("Error creating idea", error)
            reject(error)
        });
    })
};

/**
 * Find the last idea of a deck
 * @param gameId - the game id
 * @param deckId - the deck id
 * @returns A Promise that resolve the idea
 * @throws Throws the firebase error
 */
export const getLastIdeaDb = (gameId:string, deckId:number) :Promise<IIdea|undefined> => {
    return new Promise((resolve, reject) => {
        // console.log("start getLastIdea game=" + gameId + ", deckId="+deckId)

        const { $db } = useNuxtApp()
        const decksRef = collection($db as Firestore, "games/" + gameId + "/decks/" +deckId + "/ideas")
        const q = query(decksRef, orderBy("createdAt","desc"))
        getDocs(q)
        .then((listIdeas) => {
            if(listIdeas.docs.length>0) {
                const idea = new Idea(listIdeas.docs[0])
                // console.log("end getLastIdea message=" + idea.message)
                resolve(idea)
            }
            else resolve(undefined)
        })
        .catch((error) => {
            // console.error("Error getting the last idea", error)
            reject(error)
        });
    })
};

/**
 * Listening ideas of a deck
 * @param gameId - the game id
 * @param deckId - the deck id
 * @param sortByLove - sorted by love
 * @param calldecks - the method to get last decks
 * @param callback - the method to callback on snapshot updates
 */
export const listenIdeasDeckDb = (gameId:string, deckId:number, sortByLove:boolean, calldecks:any, callback:any) => {
        // console.log("start listenIdeasDeck game=" + gameId + ", deckId="+deckId)

        const { $db } = useNuxtApp()
        const decksRef = collection($db as Firestore, "games/" + gameId + "/decks/" +deckId + "/ideas")
        let q = query(decksRef, orderBy("createdAt","desc"))
        if (sortByLove) q = query(decksRef, orderBy("loved", "desc"), orderBy("createdAt","desc"));
        const unsub = onSnapshot(q,
            (querySnapshot) => {
                // console.log("changed listenIdeasDeck: gameId :" + gameId + ", deck:" + deckId + ", nb ideas received:" + querySnapshot.size)
                const ideas:IIdea[] = []
                querySnapshot.forEach((doc) => {
                    let idea = new Idea(doc)
                    ideas.push(idea)
                })
                const newDecksIdeas:[][] = []
                Object.assign(newDecksIdeas, calldecks())
                Object.assign(newDecksIdeas[deckId], ideas)
                callback(newDecksIdeas)
                // console.log("end listenIdeasDeck: gameId :" + gameId + ", deckId="+deckId + ", nb ideas:" + ideas.length)
            },
            (error) => {
                // console.error("Error listening game decks", error)
            })
};

/**
 * Update the  number of loves for a idea
 * @param gameId the game id
 * @param uid the player id
 * @param deckId the deck id
 * @param ideaId the idea id
 * @param isLoved the new love
 * @returns a Promise or the error
 */
export const updateIdeaLovesDb = (gameId:string, uid:string, deckId:number, ideaId:string, isLoved:boolean) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start updateIdeaLoves id=" + ideaId + ", isLoved:"+isLoved)

        const { $db } = useNuxtApp()
        const ideaRef = doc($db as Firestore, "games/" + gameId + "/decks/" + deckId + "/ideas", ideaId)
        let inc = 1
        let method = arrayUnion
        if(!isLoved)  {
            inc = -1
            method = arrayRemove
        }
        updateDoc(ideaRef, {
            loved : increment(inc),
            lovingPlayers : method(uid)
        })
        .then(() => {
            resolve()
        })
        .catch((error) => {
            // console.error("Error updateIdeaLoves", error)
            reject(error)
        });
    })
}

/**
 * Reset all ideas loves
 * @param gameId the game id
 * @returns a Promise void
 */
export const resetIdeasLovesDb = (gameId:string, ideas:IIdea[][]) :Promise<IIdea[][]> => {
    return new Promise((resolve, reject) => {
        // console.log("start resetIdeasLoves id=" + gameId)

        const { $db } = useNuxtApp()
        const batch = writeBatch($db as Firestore)
        let i = 0
        ideas.forEach(deck => {
            deck.forEach(idea => {
                idea.loved = 0
                let ideaRef = doc($db as Firestore, "games/" + gameId + "/decks/" + i + "/ideas", idea.id)
                batch.update(ideaRef, {
                    loved: 0,
                    lovingPlayers:[]
                });
            })
            i++
        });
        batch.commit()
        .then(() => {
            resolve(ideas)
        })
        .catch((error) => {
            // console.error("Error resetIdeasLoves", error)
            reject(error)
        });
   
    })
}
