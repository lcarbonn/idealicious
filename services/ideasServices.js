import { collection, doc, addDoc, getDoc } from "firebase/firestore"
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
