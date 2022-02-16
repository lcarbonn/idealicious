import { firestore } from '@/plugins/firebase.js';

export const getGame = (callback, id) => {
    firestore.collection("games").doc(id).get().then((doc) => {
        let game = null
        if (doc.exists) {
            game = doc.data()
            game.id = doc.id
        }
        callback(game)
    })
};

export const saveGame = async (game) => {
    console.log("saveGame id=" + game.id)
    await firestore.collection('games').doc(game.id).update({
        title: game.title,
    })
};
