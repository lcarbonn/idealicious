import { addGame, getGame, listenGame, updateGameStatus, getGames, deleteGame, getUserGames } from '~/services/gamesServices'
import { findUser } from '~/services/usersServices'

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
    },
    changeGame(state, payload) {
        let newGames = []
        state.games.forEach(game => {
          if(game.id == payload.id) {
            game = payload
          }
          newGames.push(game)
          state.games = newGames
        })
    },
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
        return new Promise((resolve, reject) => {
            getGames()
            .then((games) => {
                games.forEach(game => {
                    findUser(game.userUid)
                    .then((user) => {
                        if(user) {
                            game.user = user
                            commit("changeGame", game)
                        }
                    })
                    .catch(e => reject(e))
                });
                commit("setGames", games)
                resolve()
            })
            .catch(e => reject(e))
        })
    },

    getUserGames({ commit, dispatch }, uid) {
        const callback = games => {
            commit("setGames", games);
        }
        getUserGames(callback, uid);
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
