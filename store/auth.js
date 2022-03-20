import { getAuth, signInAnonymously } from "firebase/auth";

export const state = () => ({
    isConnected: false
});

export const getters = {
    isConnected: state => {
        return state.isConnected
    }
};

export const mutations = {
    setConnected(state, isConnected) {
        state.isConnected = isConnected
    }
};

export const actions = {
    signInAnonymous({ commit }) {
        const auth = getAuth();
        signInAnonymously(auth)
            .then(() => {
                // Signed in..
                console.debug("signInAnonymously")
                commit("setConnected", true)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                commit("setConnected", false)
            });        
    }
};
