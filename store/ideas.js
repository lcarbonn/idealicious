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
        const newIdeas = []
        Object.assign(newIdeas, state.ideas)
        Object.assign(newIdeas[payload.id], payload.ideas)
        console.debug("change ideas state update")
        state.ideas = newIdeas
    }
};

export const actions = {
    async addIdea({ commit }, payload) {
        try {
            console.debug("add idea:" + payload.idea.message)
            const idea = await addIdea(payload);
            commit("setIdea", idea);
        } catch (error) {
            console.log(error)
        }
    },

    listenIdeas({ commit }, param) {
        const callback = ideas => {
            if (ideas) {
                let i = 0
                ideas.forEach(deck => {
                    const callbackIdea = deckIdeas => {
                        commit("addDeckIdeas", deckIdeas);
                    }
                    listenDeckIdeas(callbackIdea, param.gameId, param.sortByLove, i++);
                });
                commit("setIdeas", ideas);
            }
        }
        listenDecks(callback, param.gameId);
    },

    async loveIdea({ commit }, param) {
        try {
            if (param) console.debug("loveIdea idea:" + param.idea.id + ", isLoved:" + param.isLoved)
            await loveIdea(param);
            // listen ideas already done, no need to change state
        } catch (error) {
            console.log(error)
        }
    },

    resetLoves({ state, commit }, gameId) {
        const callback = async newIdeas => {
            commit("setIdeas", newIdeas);
        }
        const copyIdeas = JSON.parse(JSON.stringify(state.ideas))
        resetLoves(callback, gameId, copyIdeas);
    },

};
