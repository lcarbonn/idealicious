// Import Firebase
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export const db = getFirestore();

export default ctx => {
    const { store } = ctx;

    return new Promise((resolve, reject) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            console.debug("onAuthStateChanged user : " +user)
            if (user) {
                store.dispatch('auth/setActiveUser', { user: user })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error)
                });

            } else {
                // if no user, login anonymously
                console.debug("signInAnonymous")
                store.dispatch("auth/signInAnonymous")
                resolve();
            }
        });
    });
};
