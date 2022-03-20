import { collection, addDoc, query, onSnapshot, orderBy, getDocs, doc, updateDoc, increment, writeBatch, Timestamp } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'

export const addIdea = async (idea) => {
    if (!idea) return null
    console.debug("start addIdea message=" + idea.message)
    const ideasRef = collection(db, "games/" + idea.gameId + "/decks/" + idea.deckId + "/ideas")
    idea.createTime = Timestamp.fromDate(new Date())
    const ref = await addDoc(ideasRef, idea)
    idea.id = ref.id
    console.debug("end addIdea id=" + idea.id)
    return idea
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

export const listenDeckIdeas = async (callback, gameId, deckId) => {
    console.debug("start listenIdeas: gameId :" + gameId)
    const ideasRef = collection(db, "games/" + gameId + "/decks/" + deckId + "/ideas")
    const qi = query(ideasRef, orderBy("createTime"));
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

export const getLastIdea = async (deck) => {
    if (!deck) return null
    console.debug("start getLastIdea gameId:" + deck.gameId + ", deckId:" + deck.id)
    const ideasRef = collection(db, "games/" + deck.gameId + "/decks/" +deck.id + "/ideas")
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
    console.debug("end getLastIdea gameId:" + deck.gameId + ", deckId:" + deck.id + ", idea:"+idea)
    return idea
};

export const loveIdea = async (param) => {
    if (!param) return null
    console.debug("start loveIdea id=" + param.idea.id + ", isLoved:" + param.isLoved)
    const ideaRef = doc(db, "games/" + param.idea.gameId + "/decks/" + param.idea.deckId + "/ideas", param.idea.id)
    let inc = 1
    if(!param.isLoved) inc = -1
    await updateDoc(ideaRef, {
        loved: increment(inc)
    })
    console.debug("end loveIdea id=" + param.idea.id + ", isLoved:" + param.isLoved)
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
