export const state = () => ({
    snackbarMessage: null,
});


export const mutations = {
    setSnackbarMessage(state, message) {
        state.snackbarMessage = message
    },
};

export const getters = {
    snackbarMessage: state => {
        return state.snackbarMessage
    },
};

export const actions = {
    setSnackbarMessage({ commit }, payload) {
        if (payload && payload.message) commit("setSnackbarMessage", new String(payload.message));
        else commit("setSnackbarMessage", null);
    },
};

