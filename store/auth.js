import { getAuth, signInAnonymously, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { saveNewUser, findUser } from '~/services/usersServices'

export const state = () => ({
    authUser: {
        uid: null,
        name: null,
        email: null,
        isAdmin:false
    }
});

export const getters = {
    authUser: state => {
        return state.authUser
    },
    isAnonymous: state => {
        return !state.authUser.email
    },
    isConnected: state => {
        return !!state.authUser?.uid
    },
    getUserEmail: state => {
        return state.authUser?.email
    },
    getUserUid: state => {
        return state.authUser?.uid
    },
    isAdmin: state  => {
        return state.authUser?.isAdmin
    },
};

export const mutations = {
    setUser(state, payload) {
        if(payload.user) {
            state.authUser.uid = payload.user.uid
            state.authUser.name = payload.user.name
            state.authUser.email = payload.user.email
            state.authUser.isAdmin = payload.user.isAdmin?payload.user.isAdmin:false
        } else {
            state.authUser.uid = null
            state.authUser.name = null
            state.authUser.email = null
            state.authUser.isAdmin = false
        }
    }
};

export const actions = {
    setActiveUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            if(!payload.user.isAnonymous) {
                findUser(payload.user.uid)
                    .then(user => {
                        commit('setUser', { user: user })
                        resolve()
                    })
                    .catch(e => {
                        commit('setUser', { user: null })
                        console.log('reject set active user')
                        reject(e)
                    });
                } else {
                    commit('setUser', { user: payload.user });
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
                commit('setUser', { user: null });
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
                    findUser(user.uid)
                        .then(userData => {
                            commit('setUser', { user: userData });
                            dispatch("snackbar/setSnackbarMessage", { message: "Bienvenue " + user.email }, { root: true });
                            resolve();
                        })
                        .catch((error) => {
                            commit('setUser', { user: null });
                            dispatch("snackbar/setSnackbarMessage", { message: "Not able to log, check your account" }, { root: true });
                            reject(error)
                        });
                })
                .catch((error) => {
                    commit('setUser', { user: null });
                    dispatch("snackbar/setSnackbarMessage", { message: "Not able to log, check your account" }, { root: true });
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
                    let user = userCredential.user;
                    user.name = payload.name
                    saveNewUser(user)
                        .then(savedUser => {
                            commit('setUser', {
                                user: savedUser
                            });
                            dispatch("snackbar/setSnackbarMessage", { message: "Bienvenue " + user.name }, { root: true });
                            resolve();
                        })
                        .catch(e => reject(e));
                })
                .catch((error) => {
                    commit('setUser', { user: null });
                    dispatch("snackbar/setSnackbarMessage", { message: "Not able to create new account : " + error.message }, { root: true });
                    reject(error)
                });
            });
    }
}
