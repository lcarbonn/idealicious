import { addGame, getGame, listenGame, updateGameStatus, getGames, deleteGame } from '~/services/gamesServices'

export const state = () => ({
    game: null,
    games:null,
});

export const getters = {
    game: state => {
        return state.game
    },
    games: state => {
        return state.games
    }
};

export const mutations = {
    setGame(state, payload) {
        state.game = payload
    },
    setGames(state, payload) {
        state.games = payload
    }
};

export const actions = {

    async addGame({ commit, dispatch }, game) {
        try {
            console.debug("add game:" + game.title)
            await addGame(game);
            commit("setGame", game);
        } catch (error) {
            console.log(error)
        }
    },

    getGame({ commit, dispatch }, id) {
        const callback = game => {
            if (game) {
                console.debug("getGame:" + game.id)
                commit("setGame", game);
            }
        }
        getGame(callback, id);
    },

    listenGame({ commit, dispatch }, id) {
        const callback = game => {
            if (game) {
                console.debug("listenGame:" + game.id)
                commit("setGame", game);
            }
        }
        listenGame(callback, id);
    },

    async updateGameStatus({ commit, dispatch }, game) {
        try {
            if (game) console.debug("updateGameStatus game:" + game.id +", started:"+game.started)
            await updateGameStatus(game);
            commit("setGame", game);
        } catch (error) {
            console.log(error)
        }
    },

    getGames({ commit, dispatch }) {
        const callback = games => {
            commit("setGames", games);
        }
        getGames(callback);
    },
    async deleteGame({ commit, dispatch }, id) {
        dispatch("snackbar/setSnackbarMessage", { message: null }, { root: true });
        try {
            await deleteGame(id);
            dispatch("snackbar/setSnackbarMessage", { message: "Game deleted" }, { root: true });
        } catch (error) {
            console.log(error)
            dispatch("snackbar/setSnackbarMessage", { message: "Error occured while deleting game" }, { root: true });
        }
    },

};
