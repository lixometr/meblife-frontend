export const state = () => ({
    items: []
})

export const getters = {
    hasItems(state) {
        return state.items.length > 0
    },
    items(state) {
        return state.items;
    }
}

export const mutations = {
    add(state, { id }) {
        state.items.push({ id })
    }
}

export const actions = {
    async add({ commit }, { id }) {
        commit('add', {
            id
        })
    }
}