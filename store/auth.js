import { getAuth, signInAnonymously, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { getUser } from '~/services/usersServices'

export const state = () => ({
    authUser: {
        uid: null,
        email: null,
        isAnonymous:false,
        isAdmin:false
    }
});

export const getters = {
    authUser: state => {
        return state.authUser
    },
    isAnonymous: state => {
        return state.authUser.isAnonymous
    },
    isConnected: state => {
        return !!state.authUser?.uid
    },
    getUserEmail: state => {
        return state.authUser?.email
    },
    isAdmin: state  => {
        return state.authUser?.isAdmin
    },
};

export const mutations = {
    setUser(state, payload) {
        if(payload.user) {
            state.authUser.uid = payload.user.uid
            state.authUser.email = payload.user.email
            state.authUser.isAnonymous = payload.user.isAnonymous
            state.authUser.isAdmin = payload.isAdmin
        } else {
            state.authUser.uid = null
            state.authUser.email = null
            state.authUser.isAnonymous = false
            state.authUser.isAdmin = false
        }
    }
};

export const actions = {
    setActiveUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            if(!payload.user.isAnonymous) {
                getUser(payload.user.email)
                    .then(userData => {
                        const isAdmin = userData?true:false
                        commit('setUser', { user: payload.user, isAdmin:isAdmin })
                        resolve()
                    })
                    .catch(e => {
                        console.log('reject set active user')
                        reject(e)
                    });
                } else {
                    commit('setUser', { user: payload.user, isAdmin:false })
                    resolve()
                }
        });
    },
    signInAnonymous({ commit }) {
        const auth = getAuth();
        signInAnonymously(auth)
            .then((userCredential) => {
                // Signed in..
                const user = userCredential.user;
                commit('setUser', { user: user });
            })
            .catch((error) => {
                commit('setUser', null);
            });        
    },
    signInWithEmailAndPassword({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, payload.email, payload.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // is a admin user ?
                    getUser(payload.email)
                        .then(userData => {
                            const isAdmin = userData?true:false
                            commit('setUser', { user: user, isAdmin:isAdmin });
                            // dispatch("snackbar/setSnackbarMessage", { message: "Bienvenue " + user.email }, { root: true });
                            resolve();
                        })
                        .catch((error) => {
                            commit('setUser', { user: null });
                            // dispatch("snackbar/setSnackbarMessage", { message: "Not able to log, check your account" }, { root: true });
                            reject(error)
                        });
                })
                .catch((error) => {
                    commit('setUser', { user: null });
                    // dispatch("snackbar/setSnackbarMessage", { message: "Not able to log, check your account" }, { root: true });
                    reject(error)
                });
        });
    },
    signOut({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            signOut(auth).then(() => {
                commit('setUser', { user: null });
                dispatch("snackbar/setSnackbarMessage", { message: "Au revoir" }, { root: true });
                resolve();
            }).catch((error) => {
                commit('setUser', { user: null });
                dispatch("snackbar/setSnackbarMessage", { message: "Erreur logout" + error.message }, { root: true });
                reject(error)
            });
        });
    },
    sendPasswordResetEmail({ commit, dispatch}, email) {
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email).then(() => {
                dispatch("snackbar/setSnackbarMessage", { message: "Email envoyé" }, { root: true });
                resolve();
            }).catch((error) => {
                dispatch("snackbar/setSnackbarMessage", { message: "Erreur envoi email : " + error.message }, { root: true });
                reject(error)
            });
        });
    },
    createUserWithEmailAndPassword({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, payload.email, payload.password)
                .then((userCredential) => {
                    // Signed up and in 
                    const user = userCredential.user;
                    commit('setUser', { user: user });
                    dispatch("snackbar/setSnackbarMessage", { message: "Bienvenue " + user.email }, { root: true });
                    resolve();
                })
                .catch((error) => {
                    commit('setUser', { user: null });
                    dispatch("snackbar/setSnackbarMessage", { message: "Not able to create new account : " + error.message }, { root: true });
                    reject(error)
                });
            });
    }
}
