import { getGame, saveGame } from '~/services/gameServices'

export const state = () => ({
    game: null
});

export const getters = {
    card: state => {
        return state.game
    }
};

export const mutations = {
    setCard(state, payload) {
        state.game = payload
    }
};

export const actions = {
    getGame({ commit, dispatch }, id) {
        const callback = game => {
            if (game) {
                commit("setGame", game)
            }
        }
        getGame(callback, id);
    },
    async saveGame({ commit, dispatch }, game) {
        // dispatch("snackbar/setIsLoading", { isLoading: true }, { root: true });
        // dispatch("snackbar/setSnackbarMessage", { message: null }, { root: true });
        try {
            await saveGame(game);
            // dispatch("snackbar/setSnackbarMessage", { message: "Card saved" }, { root: true });
            // dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            console.log(error)
            // dispatch("snackbar/setSnackbarMessage", { message: "Error occured while saving card" }, { root: true });
            // dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        }
    }
};
