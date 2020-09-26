export const state = () => ({
    items: []
})

export const getters = {
    hasItems(state) {
        return state.items.length > 0
    },
    cnt(state, getters) {
        return state.items.length
    },
    items(state) {
        return state.items;
    },
    isFavourite(state, getters) {
        return id => {
            return getters.items.findIndex(item => item._id === id) > -1
        }
    },
    getItem(state, getters) {
        return id => {
            return getters.items.find(item => item._id === id) || {}
        }
    },
}

export const mutations = {
    set(state, items) {
        state.items = items
    },
    reset(state) {
        state.items = []
    }

}

export const actions = {
    async init({ commit }) {
        try {
            if (!this.getters['user/isAuth']) return
            const items = await this.$api.$get('userFavourite')
            commit('set', items)
        } catch (err) {
            this.$error(err)
        }
    },
    reset({commit}) {
        commit('reset')
    },
    async remove({ commit, state }, { id }) {

        const newItems = state.items.filter(item => item._id !== id)
        const result = await this.$api.$put('userFavourite', null, newItems)
        if (result.ok) {
            commit('set', result.favourite)
        }
        return result
    },
    async toggle({ }, { id }) {
        if (this.getters['favourite/isFavourite'](id)) {
            this.dispatch('favourite/remove', { id })
        } else {
            this.dispatch('favourite/add', { id })

        }
    },
    async add({ commit }, { id }) {
        try {
            if (this.getters['favourite/isFavourite'](id)) return
            let items = this.getters['favourite/items']
            const itemsIds = items.map(item => item._id)
            itemsIds.push(id)
            const result = await this.$api.$put('userFavourite', null, itemsIds)
            if (result.ok) {
                commit('set', result.favourite)
            }
            if (result.error) throw result
            return result
        } catch (err) {
            this.$error(err)
        }

    }
}