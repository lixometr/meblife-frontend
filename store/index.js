import _ from "lodash"
export const state = () => ({
  activeCurrencySymbol: '',
  currencies: [],
  defaultCurrencyId: '',
  isLoading: false,
  passwordLength: 4,
})
export const getters = {
  passwordLength(state) {
    return state.passwordLength
  },
  currencies(state) {
    return state.currencies
  },
  languages(state, getters) {
    return state.i18n.languages
  },
  activeCurrency(state) {
    return state.currencies.find(cur => cur.symbol === state.activeCurrencySymbol) || {}
  },
  getLanguageByLocale(state, getters) {
    return (locale) => {
      return getters.languages.find(lang => lang.slug === locale) || {}
    }
  },
  activeLanguageSlug(state) {
    return state.i18n.locale
  },
  activeLanguage(state, getters) {
    return getters.languages.find(lang => lang.slug === getters.activeLanguageSlug) || {}
  },
  currency(state, getters) {
    return getters.activeCurrency.symbol
  },
  nuxtKey(state, getters) {
    return getters.currency + ' ' + getters.activeLanguageSlug
  },
  isLoading(state) {
    return state.isLoading
  }
}
export const mutations = {

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
  },
  startLoading(state) {
    state.isLoading = true
    if (process.client) {
      // this.dispatch('modal/open', { name: 'modal-loading' })
    }
  },
  stopLoading(state) {
    state.isLoading = false
    if (process.client) {
      // this.dispatch('modal/close', { name: 'modal-loading' })

    }

  },
}
export const actions = {
  /**
   * 
   * @param {Array<id>} moduleGroupIds 
   */
  async fetchModuleGroups({ }, moduleGroupIds) {
    let moduleGroups = []
    if (moduleGroupIds && _.isArray(moduleGroupIds) && !_.isEmpty(moduleGroupIds)) {
      const resolvers = moduleGroupIds.map(async (id) => {
        const result = await this.$api.$get("moduleGroupById", {
          id,
        });
        return result
      });
      moduleGroups = await Promise.all(resolvers)
      return moduleGroups
    }
  },
  async nuxtServerInit({ commit, dispatch }, { app, i18n, route }) {
    try {


      await dispatch('settings/init')
      await dispatch('user/init')

      const currencies = await this.$api.$get('currencies')
      const defaultCurrencyId = await this.$api.$get('settingByName', { name: 'currency' })
      commit('setDefaultCurrencyId', defaultCurrencyId)
      commit('setCurrencies', currencies)
      commit('initCurrency')
      commit('cart/init')
      await dispatch('favourite/init')

    } catch (err) {
      this.$error(err)
    }
  },

}