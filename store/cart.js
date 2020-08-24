export const state = () => ({
    items: []
})

export const getters =  {
    hasItems(state) {
        return state.items.length > 0
    },
    items(state) {
        return state.items;
    }
}

export const mutations =  {

}

export const actions =  {
    async addItem(state) {

    }
}