import _ from "lodash"
export const state = () => ({
    items: []
})

export const getters = {
    hasItem(state) {
        return (id) => {
            return state.items.findIndex(item => item.id === id) > -1
        }
    },
    
    getItem(state) {
        return (id) => {
            return state.items.find(item => item.id === id)
        }
    },

    hasItems(state) {
        return state.items.length > 0
    },
    items(state) {
        return state.items;
    },
    cnt(state, getters) {
        return getters.items.length
    }
}

export const mutations = {
    add(state, { cnt, id }) {
        if(!id) return
        cnt = parseInt(cnt)
        if (isNaN(cnt)) cnt = 1
        let cookieCart = this.$cookies.get('cart')
        if (!_.isArray(cookieCart)) cookieCart = []
        const inCartIdx = cookieCart.findIndex(item => item.id === id);
        if (inCartIdx > -1) {
            cookieCart[inCartIdx].cnt += cnt
        } else {
            cookieCart.push({ id, cnt })
        }
        this.$cookies.set('cart', cookieCart)
        state.items = cookieCart
        console.log('here is cart', cookieCart)
    },
    remove(state, { id }) {
        let cookieCart = this.$cookies.get('cart')
        if (!_.isArray(cookieCart)) return
        cookieCart = cookieCart.filter(item => item.id !== id)
        this.$cookies.set('cart', cookieCart)
        state.items = cookieCart
        console.log('here is cart', cookieCart)
    },
    update(state, { id, cnt }) {
        cnt = parseInt(cnt)
        if (isNaN(cnt)) cnt = 1
        let cookieCart = this.$cookies.get('cart')
        if (!_.isArray(cookieCart)) return
        const itemIdx = cookieCart.findIndex(item => item.id === id)
        if (itemIdx < 0) return
        cookieCart[itemIdx].cnt = cnt
        this.$cookies.set('cart', cookieCart)
        state.items = cookieCart
        console.log('here is cart', cookieCart)
    },
    init(state) {
        let cookieCart = this.$cookies.get('cart') || []
        console.log(('init', cookieCart))
        if (!_.isArray(cookieCart)) cookieCart = []
        state.items = cookieCart
    }
}

export const actions = {
    async add({ commit }, payload) {
        commit('add', payload)
    },
    async remove({ commit }, payload) {
        commit('remove', payload)
    },
    async update({ commit }, payload) {
        commit('update', payload)
    },

}