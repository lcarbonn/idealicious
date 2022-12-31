import { getAuth, signInAnonymously, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const state = () => ({
    authUser: {
        uid: null,
        email: null,
        isAnonymous:false
    },
    loading: true
});

export const getters = {
    isAnonymous: state => {
        return state.authUser.isAnonymous
    },
    isConnected: state => {
        return !!state.authUser?.uid
    },
    getUserEmail: state => {
        return state.authUser?.email
    }
};

export const mutations = {
    setUser(state, payload) {
        Object.assign(state.authUser, payload.user);
        state.loading = false
    }
};

export const actions = {
    signInAnonymous({ commit }) {
        const auth = getAuth();
        signInAnonymously(auth)
            .then((userCredential) => {
                // Signed in..
                const user = userCredential.user;
                commit('setUser', { user: { uid: user.uid, email: user.email, isAnonymous: user.isAnonymous } });
                // commit("setAnonymousConnected", true)
            })
            .catch((error) => {
                commit('setUser', null);
            });        
    },
    setActiveUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            if(payload) commit('setUser', { user: { uid: payload.uid, email: payload.email, isAnonymous: payload.isAnonymous } });
            else commit('setUser', { user: { uid: null, email: null, isAnonymous: false } });
            resolve();
        });
    },
    signInWithEmailAndPassword({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, payload.email, payload.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    commit('setUser', { user: { uid: user.uid, email: user.email, isAnonymous: user.isAnonymous } });
                    dispatch("snackbar/setSnackbarMessage", { message: "Bienvenue " + user.email }, { root: true });
                    resolve();
                })
                .catch((error) => {
                    commit('setUser', { user: null });
                    dispatch("snackbar/setSnackbarMessage", { message: "Not able to log, check your account" }, { root: true });
                    reject(e)
                });
        });
    },
    signOut({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            signOut(auth).then(() => {
                commit('setUser', { user: { uid: null, email: null, isAnonymous: false } });
                dispatch("snackbar/setSnackbarMessage", { message: "Au revoir" }, { root: true });
                resolve();
            }).catch((error) => {
                commit('setUser', { user: { uid: null, email: null, isAnonymous: false } });
                dispatch("snackbar/setSnackbarMessage", { message: "Erreur logout" + error.message }, { root: true });
                reject(e)
            });
        });
    }
};
