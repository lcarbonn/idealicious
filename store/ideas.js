import { addIdea, listenDecks, listenDeckIdeas, loveIdea, resetLoves } from '~/services/ideasServices'

export const state = () => ({
    idea: null,
    ideas:null
});

export const getters = {
    idea: state => {
        return state.idea
    },
    ideas: state => {
        return state.ideas
    }
};

export const mutations = {
    setIdea(state, payload) {
        state.idea = payload
    },
    setIdeas(state, payload) {
        console.debug("change ideas state set")
        state.ideas = payload
    },
    addDeckIdeas(state, payload) {
        const newIdeas = JSON.parse(JSON.stringify(state.ideas))
        newIdeas[payload.id] = JSON.parse(JSON.stringify(payload.ideas))
        console.debug("change ideas state update")
        state.ideas = newIdeas
    }
};

export const actions = {
    async addIdea({ commit, dispatch }, idea) {
        try {
            console.debug("add idea:" + idea.message)
            idea = await addIdea(idea);
            commit("setIdea", idea);
        } catch (error) {
            console.log(error)
        }
    },

    listenIdeas({ commit, dispatch }, gameId) {
        const callback = ideas => {
            if (ideas) {
                let i = 0
                ideas.forEach(deck => {
                    const callbackIdea = deckIdeas => {
                        commit("addDeckIdeas", deckIdeas);
                    }
                    listenDeckIdeas(callbackIdea, gameId, i++);
                });
                commit("setIdeas", ideas);
            }
        }
        listenDecks(callback, gameId);
    },

    async loveIdea({ commit, dispatch }, param) {
        try {
            if (param) console.debug("loveIdea idea:" + param.idea.id + ", isLoved:" + param.isLoved)
            await loveIdea(param);
            // listen ideas already done, no need to change state
        } catch (error) {
            console.log(error)
        }
    },

    resetLoves({ state, commit, dispatch }, gameId) {
        const callback = async newIdeas => {
            commit("setIdeas", newIdeas);
        }
        const copyIdeas = JSON.parse(JSON.stringify(state.ideas))
        resetLoves(callback, gameId, copyIdeas);
    },

};
