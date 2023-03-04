import { addDeck, listenDeck, getDeck, sendDeck } from '~/services/decksServices'
import { getLastIdea} from '~/services/ideasServices'

export const state = () => ({
    deck: null,
    decks: null,
    lastIdea: null,
});

export const getters = {
    deck: state => {
        return state.deck
    },
    decks: state => {
        return state.decks
    },
    lastIdea: state => {
        return state.lastIdea
    }
};

export const mutations = {
    setDeck(state, payload) {
        state.deck = payload
    },
    setDecks(state, payload) {
        state.decks = payload
    },
    setLastIdea(state, payload) {
        state.lastIdea = payload
    },
};

export const actions = {
    async addDeck({ commit }, payload) {
        try {
            console.debug("add deck:" + payload.deck.id)
            await addDeck(payload);
            commit("setDeck", payload.deck);
        } catch (error) {
            console.log(error)
        }
    },

    listenDeck({ commit, dispatch }, payload) {
        const callback = deck => {
            if (deck) {
                console.debug("listenDeck :" + deck.id)
                commit("setDeck", deck);
                dispatch("getLastIdea", {gameId:payload.gameId, deckId:deck.id})
            } else {
                commit("setDeck", deck);
                commit("setLastIdea", null);
            }
        }
        listenDeck(callback, payload);
    },

    getDeck({ commit, dispatch }, payload) {
        const callback = deck => {
            if (deck) {
                console.debug("getDeck :" + deck.id)
                commit("setDeck", deck);
                dispatch("getLastIdea", {gameId:payload.gameId, deckId:deck.id})
            }
        }
        getDeck(callback, payload);
    },

    async sendDeck({ commit, dispatch }, payload) {
        try {
            if (payload) console.debug("sendDeck deck:" + payload.deck.id + ", playerId:" + payload.deck.playerId)
            await sendDeck(payload);
            commit("setDeck", payload.deck);
        } catch (error) {
            console.log(error)
        }
    },

    async getLastIdea({ commit, dispatch }, payload) {
        try {
            let idea = await getLastIdea(payload);
            commit("setLastIdea", idea);
        } catch (error) {
            console.log(error)
        }
    },


};
