import { collection, addDoc, query, onSnapshot, orderBy, getDocs, doc, updateDoc, increment, writeBatch, Timestamp } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const addIdea = async (payload) => {
    console.debug("start addIdea message=" + payload.idea.message)
    const ideasRef = collection(db, "games/" + payload.gameId + "/decks/" + payload.deckId + "/ideas")
    payload.idea.createTime = Timestamp.fromDate(new Date())
    const ref = await addDoc(ideasRef, payload.idea)
    payload.idea.id = ref.id
    console.debug("end addIdea id=" + payload.idea.id)
    return payload.idea
};

export const listenDecks = async (callback, gameId) => {
    console.debug("start listenDecks: gameId :" + gameId)
    const decksRef = collection(db, "games/" + gameId + "/decks")
    const q = query(decksRef, orderBy("id"));
    const unsubd = onSnapshot(q, (decksSnapshot) => {
        const ideas = []
        decksSnapshot.forEach((deckSnap) => {
            let deck = []
            ideas.push(deck)
        })
        console.debug("end listenDecks: gameId :" + gameId + ", " + ideas.length)
        callback(ideas)
    });
};

export const listenDeckIdeas = async (callback, gameId, sortByLove, deckId) => {
    console.debug("start listenIdeas: gameId :" + gameId)
    const ideasRef = collection(db, "games/" + gameId + "/decks/" + deckId + "/ideas")
    let qi = query(ideasRef, orderBy("createTime"));
    if (sortByLove) qi = query(ideasRef, orderBy("loved", "desc"), orderBy("createTime"));
    const unsubi = onSnapshot(qi, (ideasSnapshot) => {
        const ideas = []
        ideasSnapshot.forEach((ideaSnap) => {
            const idea = ideaSnap.data()
            if (idea.message != "") {
                idea.id = ideaSnap.id
                ideas.push(idea)
            }
        })
        console.debug("end listenIdeas: gameId :" + gameId + ", " + ideas.length)
        const deckIdeas = {
            id : deckId,
            ideas: ideas
        }
        callback(deckIdeas)
    })
};

export const getLastIdea = async (payload) => {
    console.debug("start getLastIdea gameId:" + payload.gameId + ", deckId:" + payload.deckId)
    const ideasRef = collection(db, "games/" + payload.gameId + "/decks/" +payload.deckId + "/ideas")
    const q = query(ideasRef, orderBy("createTime","desc"));
    const querySnapshot = await getDocs(q)
    let idea = null
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const docSnap = querySnapshot.docs[index];
        if (docSnap) {
            idea = docSnap.data()
            idea.id = docSnap.id
            if (idea.message != "") break
        }
    }
    console.debug("end getLastIdea gameId:" + payload.gameId + ", deckId:" + payload.deckId + ", idea:"+idea)
    return idea
};

export const loveIdea = async (payload) => {
    console.debug("start loveIdea id=" + payload.idea.id + ", isLoved:" + payload.isLoved)
    const ideaRef = doc(db, "games/" + payload.gameId + "/decks/" + payload.deckId + "/ideas", payload.idea.id)
    let inc = 1
    if(!payload.isLoved) inc = -1
    await updateDoc(ideaRef, {
        loved: increment(inc)
    })
    console.debug("end loveIdea id=" + payload.idea.id + ", isLoved:" + payload.isLoved)
};

export const resetLoves = async (callback, gameId, ideas) => {
    console.debug("start resetLoves gameId=" + gameId + ", ideas:" + ideas)
    const batch = writeBatch(db)
    let i = 0
    ideas.forEach(deck => {
        deck.forEach(idea => {
            idea.loved = 0
            let ideaRef = doc(db, "games/" + gameId + "/decks/" + i + "/ideas", idea.id)
            batch.update(ideaRef, {
                loved: 0
            });
        })
        i++
    });
    await batch.commit()
    callback(ideas)
    console.debug("end resetLoves gameId=" + gameId + ", ideas:" + ideas)
};
