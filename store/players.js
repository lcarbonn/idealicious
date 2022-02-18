import { addPlayer, getPlayer } from '~/services/playersServices'

export const state = () => ({
    player: null
});

export const getters = {
    player: state => {
        return state.player
    }
};

export const mutations = {
    setPlayer(state, payload) {
        state.player = payload
    }
};

export const actions = {
    getPlayer({ commit, dispatch }, id) {
        const callback = player => {
            if (player) {
                console.debug("getPlayer:" + player.id)
                commit("setPlayer", player);
            }
        }
        getPlayer(callback, id);
    },

    async addPlayer({ commit, dispatch }, player) {
        try {
            console.debug("add player:" + player.name)
            await addPlayer(player);
            commit("setPlayer", player);
        } catch (error) {
            console.log(error)
        }
    }
};
