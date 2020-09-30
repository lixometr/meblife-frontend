import _ from "lodash"
export const state = () => ({
  isLoading: false,
  passwordLength: 4,
})
export const getters = {
  passwordLength(state) {
    return state.passwordLength
  },
  currency(state, getters) {
    return getters['currency/activeCurrency'].symbol
  },

  languages(state, getters) {
    return state.i18n.languages
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

  nuxtKey(state, getters) {
    return getters.currency + ' ' + getters.activeLanguageSlug
  },
  isLoading(state) {
    return state.isLoading
  }
}
export const mutations = {

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
  async fetchModuleGroups({ }, { moduleGroupIds, area }) {
    let moduleGroups = []
    if (moduleGroupIds && _.isArray(moduleGroupIds) && !_.isEmpty(moduleGroupIds)) {
      const resolvers = moduleGroupIds.map(async (id) => {
        const result = await this.$api.$get("moduleGroupById", {
          id,
        });
        return result
      });
      moduleGroups = await Promise.all(resolvers)
    }
    // Загружаем глобальные модули
    let globalModules = []
    if (area) {
      try {
        globalModules = await this.$api.$get('moduleGroupByArea', {
          area
        })
      } catch (err) { }
    }
    moduleGroups = [...globalModules, ...moduleGroups]
    return moduleGroups
  },
  async nuxtServerInit({ commit, dispatch }, { app, i18n, route }) {
    try {
      await dispatch('settings/init')
      await dispatch('user/init')
      await dispatch('currency/init')

      commit('cart/init')
      await dispatch('favourite/init')

    } catch (err) {
      this.$error(err)
    }
  },

}