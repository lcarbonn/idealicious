import { addPlayer, getPlayer, listenNbPlayers, updatePlayerRound, getNbPlayers, getPlayers } from '~/services/playersServices'
import { findUser } from '~/services/usersServices'

export const state = () => ({
    player: null,
    players: null,
    nbPlayers:0
});

export const getters = {
    player: state => {
        return state.player
    },
    nbPlayers: state => {
        return state.nbPlayers
    },
    players: state => {
        return state.players
    },

};

export const mutations = {
    setPlayer(state, payload) {
        state.player = payload
    },
    setNbPlayers(state, payload) {
        state.nbPlayers = payload
    },
    setPlayers(state, payload) {
        state.players = payload
    },
};

export const actions = {

    async addPlayer({ commit }, payload) {
        try {
            console.debug("add player:" + payload.player.name)
            const addedPlayer = await addPlayer(payload);
            commit("setPlayer", addedPlayer);
        } catch (error) {
            console.log(error)
        }
    },

    async getPlayer({ commit }, payload) {
        const player = await getPlayer(payload);
        if (player) {
            console.debug("setPlayer in state:" + player.id)
            commit("setPlayer", player);
        }
    },

    listenNbPlayers({ commit }, gameId) {
        console.debug("listenNbPlayers gameId:" + gameId)
        const callback = nbPlayer => {
            if (nbPlayer) {
                console.debug("listenNbPlayers:" + nbPlayer)
                commit("setNbPlayers", nbPlayer);
            }
        }
        listenNbPlayers(callback, gameId);
    },

    async getNbPlayers({ commit }, gameId) {
        const nbPlayers = await getNbPlayers(gameId);
        if (nbPlayers) {
            console.debug("getNbPlayers:" + nbPlayers)
            commit("setNbPlayers", nbPlayers);
        }
    },

    async updatePlayerRound({ commit }, payload) {
        try {
            await updatePlayerRound(payload);
            commit("setPlayer", payload.player);
        } catch (error) {
            console.log(error)
        }
    },

    getPlayers({ commit }, gameId) {
        return new Promise((resolve, reject) => {
            getPlayers(gameId)
            .then((players) => {
                players.forEach(player => {
                    findUser(player.id)
                    .then((user) => {
                        player.user = user
                        commit("setPlayers", players);
                    })
                    .catch(e => reject(e));
                });
            })
            .catch(e => reject(e));
        })
    },

};
