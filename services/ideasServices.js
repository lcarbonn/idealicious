import { collection, doc, addDoc, getDoc, getDocs, query, where, limit, onSnapshot, orderBy, Timestamp  } from "firebase/firestore"
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
    idea.timestamp = Timestamp.fromDate(new Date())
    const ref = await addDoc(collection(db, "ideas"), idea)
    idea.id = ref.id
    console.log("added Idea id=" + idea.id)
    return idea
};

export const getLastIdea = async (callback, deckId) => {
    const ideasRef = collection(db, "ideas")
    const q = query(ideasRef, where("deckId", "==", deckId), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docSnap = querySnapshot.docs[0]
        let idea = null
        if (docSnap) {
            idea = docSnap.data()
            idea.id = docSnap.id
        }
        console.debug("getLastIdea deckId:"+deckId+" idea:"+idea)
        callback(idea)
    });
};
