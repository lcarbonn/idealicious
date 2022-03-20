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
    async addDeck({ commit, dispatch }, deck) {
        try {
            console.debug("add deck:" + deck.id)
            await addDeck(deck);
            commit("setDeck", deck);
        } catch (error) {
            console.log(error)
        }
    },

    listenDeck({ commit, dispatch }, param) {
        const callback = deck => {
            if (deck) {
                console.debug("listenDeck :" + deck.id)
                commit("setDeck", deck);
                dispatch("getLastIdea", deck)
            } else {
                commit("setDeck", deck);
                commit("setLastIdea", null);
            }
        }
        listenDeck(callback, param);
    },

    getDeck({ commit, dispatch }, param) {
        const callback = deck => {
            if (deck) {
                console.debug("getDeck :" + deck.id)
                commit("setDeck", deck);
                dispatch("getLastIdea", deck)
            }
        }
        getDeck(callback, param);
    },

    async sendDeck({ commit, dispatch }, deck) {
        try {
            if (deck) console.debug("sendDeck deck:" + deck.id + ", playerId:" + deck.playerId)
            await sendDeck(deck);
            commit("setDeck", deck);
        } catch (error) {
            console.log(error)
        }
    },

    async getLastIdea({ commit, dispatch }, deck) {
        try {
            let idea = await getLastIdea(deck);
            commit("setLastIdea", idea);
        } catch (error) {
            console.log(error)
        }
    },


};
