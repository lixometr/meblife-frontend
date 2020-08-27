export const state = () => ({
  currency: 'р.'
})
export const getters = {
  currency(state) {
    return state.currency
  }
}
