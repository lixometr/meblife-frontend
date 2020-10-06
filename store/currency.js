export const state = () => ({
    activeCurrencySymbol: '',
    currencies: [],
    defaultCurrencyId: '',
})
export const getters = {
    currency(state, getters) {
        return getters.activeCurrency.symbol
    },
    activeCurrency(state) {
        return state.currencies.find(cur => cur.symbol === state.activeCurrencySymbol) || {}
    },
    currencies(state) {
        return state.currencies
    },
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
        let idx = this.getters['currency/currencies'].findIndex(cur => cur._id == state.defaultCurrencyId)
        if (idx < 0) {
            idx = 0
        }

        this.commit('currency/selectCurrency', this.getters['currency/currencies'][idx].symbol)
    },
    setDefaultCurrencyId(state, id) {
        state.defaultCurrencyId = id
    },
}
export const actions = {
    async init({ commit }) {
        try {
            const currencies = await this.$api.$get('currencies')
            const defaultCurrencyId = await this.$api.$get('settingByName', { name: 'currency' })
            commit('setDefaultCurrencyId', defaultCurrencyId)
            commit('setCurrencies', currencies)
            commit('initCurrency')
        } catch (err) {
            this.$error(err)
        }

    }
}