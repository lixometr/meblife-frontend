export const state = () => ({
  activeCurrencySymbol: '',
  currencies: [],
  languages: [],
  defaultCurrencyId: ''
})
export const getters = {
  currencies(state) {
    return state.currencies
  },
  activeCurrency(state) {
    return state.currencies.find(cur => cur.symbol === state.activeCurrencySymbol) || {}
  },
  currency(state, getters) {
    return getters.activeCurrency.symbol
  },
}
export const mutations = {
  setLanguages(state, languages) {
    state.languages = languages;
  },
  setCurrencies(state, currencies) {
    state.currencies = currencies;
  },

  selectCurrency(state, symbol) {
    state.activeCurrencySymbol = symbol;
    this.$cookies.set('currency', symbol, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24
    })
  },
  initCurrency(state) {
    const currency = this.$cookies.get('currency')
    if (currency) {
      if (state.currencies.findIndex(cur => cur.symbol === currency) > -1) {
        state.activeCurrencySymbol = currency
        return
      }
    }
    let idx = this.getters.currencies.findIndex(cur => cur._id == state.defaultCurrencyId)
    if (idx < 0) {
      idx = 0
    }

    this.commit('selectCurrency', this.getters.currencies[idx].symbol)
  },
  setDefaultCurrencyId(state, id) {
    state.defaultCurrencyId = id
  }
}
export const actions = {
  async nuxtServerInit({ commit }, { app, i18n, route }) {
    try {
      const languages = await this.$api.$get('languages')
      commit('setLanguages', languages)
      const currencies = await this.$api.$get('currencies')
      const defaultCurrencyId = await this.$api.$get('settingByName', { name: 'currency' })
      commit('setDefaultCurrencyId', defaultCurrencyId)
      commit('setCurrencies', currencies)
      commit('initCurrency')
      commit('cart/init')

    } catch (err) {
      this.$error(err)
    }
  },

}