import { getUsers } from '~/services/usersServices'

export const state = () => ({
    users:null,
});

export const getters = {
    users: state => {
        return state.users
    }
};

export const mutations = {
    setUsers(state, payload) {
        state.users = payload
    }
};

export const actions = {

    getUsers({ commit, dispatch }) {
        const callback = users => {
            commit("setUsers", users);
        }
        getUsers(callback);
    },

};
