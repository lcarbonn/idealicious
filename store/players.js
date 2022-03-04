import { addPlayer, getPlayer, listenNbPlayers } from '~/services/playersServices'

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

    async addPlayer({ commit, dispatch }, player) {
        try {
            console.debug("add player:" + player.name)
            await addPlayer(player);
            commit("setPlayer", player);
        } catch (error) {
            console.log(error)
        }
    },

    getPlayer({ commit, dispatch }, playerIds) {
        const callback = player => {
            if (player) {
                console.debug("setPlayer in state:" + player.id)
                commit("setPlayer", player);
            }
        }
        getPlayer(callback, playerIds);
    },

    listenNbPlayers({ commit, dispatch }, gameId) {
        console.debug("listenNbPlayers gameId:" + gameId)
        const callback = nbPlayer => {
            if (nbPlayer) {
                console.debug("listenNbPlayers:" + nbPlayer)
                commit("setNbPlayers", nbPlayer);
            }
        }
        listenNbPlayers(callback, gameId);
    },

};
