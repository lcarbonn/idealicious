import { addIdea, getIdea, getLastIdea } from '~/services/ideasServices'

export const state = () => ({
    idea: null,
    lastIdea: null
});

export const getters = {
    idea: state => {
        return state.idea
    },
    lastIdea: state => {
        return state.lastIdea
    }
};

export const mutations = {
    setIdea(state, payload) {
        state.idea = payload
    },
    setLastIdea(state, payload) {
        state.lastIdea = payload
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
    }
};
