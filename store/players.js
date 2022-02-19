import { addPlayer, getPlayer, getNbPlayers } from '~/services/playersServices'

export const state = () => ({
    player: null,
    nbPlayers:0
});

export const getters = {
    player: state => {
        return state.player
    },
    nbPlayers: state => {
        return state.nbPlayers
    },

};

export const mutations = {
    setPlayer(state, payload) {
        state.player = payload
    },
    setNbPlayers(state, payload) {
        state.nbPlayers = payload
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
    },

    getNbPlayers({ commit, dispatch }, gameId) {
        console.debug("getNbPlayers gameId:" + gameId)
        const callback = nbPlayer => {
            if (nbPlayer) {
                console.debug("getNbPlayers:" + nbPlayer)
                commit("setNbPlayers", nbPlayer);
            }
        }
        getNbPlayers(callback, gameId);
    },

};
