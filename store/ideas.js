import { addIdea, listenLastIdea, getIdeas, getLastIdea } from '~/services/ideasServices'

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
    async addIdea({ commit, dispatch }, idea) {
        try {
            console.debug("add idea:" + idea.message)
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

    listenLastIdea({ commit, dispatch }, param) {
        const callback = async idea => {
            let lastIdea = idea
            if (lastIdea) {
                console.debug("listenLastIdea id:" + lastIdea.id)
                console.debug("idea.message:" + lastIdea.message)
                if (lastIdea.message=="") {
                    while (lastIdea && lastIdea.message == "" && param.round > 1) {
                        console.debug("skiped idea, round:" + param.round)
                        param.round--
                        lastIdea = await getLastIdea(param)
                    }
                }
            }
            commit("setLastIdea", lastIdea);
        }
        listenLastIdea(callback, param);
    },
};
