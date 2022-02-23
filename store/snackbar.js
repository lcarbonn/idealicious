export const state = () => ({
    isLoading: false,
    snackbarMessage: null,
});


export const mutations = {
    setSnackbarMessage(state, message) {
        state.snackbarMessage = message
    },
    setIsLoading(state, isLoading) {
        state.isLoading = isLoading
    }
};

export const getters = {
    snackbarMessage: state => {
        return state.snackbarMessage
    },
    isLoading: state => {
        return state.isLoading
    }
};

export const actions = {
    setSnackbarMessage({ commit }, payload) {
        commit("setSnackbarMessage", payload.message);
    },
    setIsLoading({ commit }, payload) {
        commit("setIsLoading", payload.isLoading);
    }
};

