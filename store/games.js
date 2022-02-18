import { addGame, getGame } from '~/services/gamesServices'

export const state = () => ({
    game: null
});

export const getters = {
    game: state => {
        return state.game
    }
};

export const mutations = {
    setGame(state, payload) {
        state.game = payload
    }
};

export const actions = {
    getGame({ commit, dispatch }, id) {
        const callback = game => {
            if (game) {
                console.debug("getGame:" + game.id)
                commit("setGame", game);
            }
        }
        getGame(callback, id);
    },

    async addGame({ commit, dispatch }, game) {
        try {
            console.debug("add game:" + game.title)
            await addGame(game);
            commit("setGame", game);
        } catch (error) {
            console.log(error)
        }
    }
};
