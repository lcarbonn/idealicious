import { collection, doc, addDoc, getDoc, getDocs, query, where, limit, onSnapshot, orderBy } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'


export const getIdea = async (callback, id) => {
    const docRef = doc(db, "ideas", id)
    const docSnap = await getDoc(docRef)
    let idea = null
    if (docSnap.exists()) {
        idea = docSnap.data()
        idea.id = docSnap.id
    }
    callback(idea)
};

export const addIdea = async (idea) => {
    const ref = await addDoc(collection(db, "ideas"), idea)
    idea.id = ref.id
    console.log("added Idea id=" + idea.id)
    return idea
};

export const getLastIdea = async (callback, param) => {
    console.debug("getLastIdea deckId:" + param.deckId + ", round:" + param.round)
    const ideasRef = collection(db, "ideas")
    const q = query(ideasRef, where("gameId", "==", param.gameId), where("deckId", "==", param.deckId), where("round", "==", param.round));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docSnap = querySnapshot.docs[0]
        let idea = null
        if (docSnap) {
            idea = docSnap.data()
            idea.id = docSnap.id
        }
        console.debug("getLastIdea deckId:" + param.deckId + ", round:" + param.round+", idea:"+idea)
        callback(idea)
    });
};

export const getIdeas = async (callback, gameId) => {
    console.debug("getIdeas: gameId :" + gameId)
    const ideasRef = collection(db, "ideas")
    const q = query(ideasRef, where("gameId", "==", gameId), orderBy("deckId"), orderBy("round"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const ideas = [];
        querySnapshot.forEach((docSnap) => {
            let idea = docSnap.data()
            if (idea.message != "") {
                idea.id = docSnap.id
                let deck = ideas[idea.deckId]
                if (!deck) {
                    deck = []
                    ideas.push(deck)
                }
                deck.push(idea)
            }
        });
        console.debug("getIdeas :" + ideas.join(", "))
        callback(ideas)
    });
};
