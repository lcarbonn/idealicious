import { collection, addDoc, query, where, onSnapshot, orderBy, getDocs } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const addIdea = async (idea) => {
    if (!idea) return null
    console.debug("start addIdea id=" + idea.message)
    const ideasRef = collection(db, "games/" + idea.gameId + "/ideas")
    const ref = await addDoc(ideasRef, idea)
    idea.id = ref.id
    console.debug("end addIdea id=" + idea.id)
    return idea
};

export const getIdeas = async (callback, gameId) => {
    console.debug("start getIdeas: gameId :" + gameId)
    const ideasRef = collection(db, "games/" + gameId + "/ideas")
    const q = query(ideasRef, orderBy("deckId"), orderBy("round"));
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
        console.debug("end getIdeas: gameId :" + gameId +", " + ideas.length)
        callback(ideas)
    });
};

export const listenLastIdea = async (callback, param) => {
    if (!param) return null
    console.debug("start listenLastIdea gameId:"+param.gameId+", deckId:" + param.deckId + ", round:" + param.round)
    const ideasRef = collection(db, "games/" + param.gameId + "/ideas")
    const q = query(ideasRef, where("deckId", "==", param.deckId), where("round", "==", param.round));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docSnap = querySnapshot.docs[0]
        let idea = null
        if (docSnap) {
            idea = docSnap.data()
            idea.id = docSnap.id
        }
        console.debug("end listenLastIdea gameId:" + param.gameId +", deckId:" + param.deckId + ", round:" + param.round + ", idea:" + idea)
        callback(idea)
    });
};

export const getLastIdea = async (param) => {
    if (!param) return null
    console.debug("start getLastIdea gameId:" + param.gameId + ", deckId:" + param.deckId + ", round:" + param.round)
    const ideasRef = collection(db, "games/" + param.gameId + "/ideas")
    const q = query(ideasRef, where("deckId", "==", param.deckId), where("round", "==", param.round));
    const querySnapshot = await getDocs(q)
    const docSnap = querySnapshot.docs[0]
    let idea = null
    if (docSnap) {
        idea = docSnap.data()
        idea.id = docSnap.id
    }
    console.debug("end getLastIdea gameId:" + param.gameId + ", deckId:" + param.deckId + ", round:" + param.round + ", idea:" + idea)
    return idea
};
