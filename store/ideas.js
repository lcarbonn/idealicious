import { addIdea, getIdea, getLastIdea, getIdeas } from '~/services/ideasServices'

export const state = () => ({
    idea: null,
    lastIdea: null,
    ideas:null
});

export const getters = {
    idea: state => {
        return state.idea
    },
    lastIdea: state => {
        return state.lastIdea
    },
    ideas: state => {
        return state.ideas
    }
};

export const mutations = {
    setIdea(state, payload) {
        state.idea = payload
    },
    setLastIdea(state, payload) {
        state.lastIdea = payload
    },
    setIdeas(state, payload) {
        state.ideas = payload
    }
};

export const actions = {
    getIdea({ commit, dispatch }, id) {
        const callback = idea => {
            if (idea) {
                console.debug("getIdea id:" + idea.id)
                commit("setIdea", idea);
            }
        }
        getIdea(callback, id);
    },

    getLastIdea({ commit, dispatch }, param) {
        const callback = idea => {
            if (idea) console.debug("getLastIdea id:" + idea.id)
            else console.debug("getLastIdea id:" + idea)
            commit("setLastIdea", idea);
        }
        getLastIdea(callback, param);
    },

    async addIdea({ commit, dispatch }, idea) {
        try {
            console.debug("add idea:" + idea.title)
            await addIdea(idea);
            commit("setIdea", idea);
        } catch (error) {
            console.log(error)
        }
    },

    getIdeas({ commit, dispatch }, gameId) {
        const callback = ideas => {
            console.debug("getIdeas :" + ideas.length)
            if (ideas) {
                commit("setIdeas", ideas);
            }
        }
        getIdeas(callback, gameId);
    },

};
