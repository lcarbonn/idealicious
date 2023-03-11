export const state = () => ({
    title:null,
});

export const getters = {
    title: state => {
        return state.title
    }
};

export const mutations = {
    setTitle(state, payload) {
        state.title = payload
    }
};

export const actions = {
    setTitle({ commit, dispatch }, title) {
        commit("setTitle", title)
    }
}
