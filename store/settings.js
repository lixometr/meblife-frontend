export const state = () => ({
    items: {}
})
export const getters = {
    item(state) {
        return name => state.items[name]
    },
    items(state) {
        return state.items
    }
}

export const mutations = {
    setItems(state, items) {
        state.items = items
    }
}
export const actions = {
    async init({ commit }) {
        try {
            const phone = await this.$api.$get('settingByName', { name: "phone" })
            const email = await this.$api.$get('settingByName', { name: "email" })
            const logo = await this.$api.$get('settingByName', { name: "logo" })
            commit('setItems', {
                phone,
                email,
                logo
            })
        } catch (err) {
            this.$error(err)
        }

    }
}