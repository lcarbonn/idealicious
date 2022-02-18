import { addIdea, getIdea } from '~/services/ideasServices'

export const state = () => ({
    idea: null
});

export const getters = {
    idea: state => {
        return state.idea
    }
};

export const mutations = {
    setIdea(state, payload) {
        state.idea = payload
    }
};

export const actions = {
    getIdea({ commit, dispatch }, id) {
        const callback = idea => {
            if (idea) {
                console.debug("getIdea:" + idea.id)
                commit("setIdea", idea);
            }
        }
        getIdea(callback, id);
    },

    async addIdea({ commit, dispatch }, idea) {
        try {
            console.debug("add idea:" + idea.title)
            await addIdea(idea);
            commit("setIdea", idea);
        } catch (error) {
            console.log(error)
        }
    }
};
