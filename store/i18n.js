
export const state = () => ({
    locale: '',
    languages: [],
    defaultLocale: '',
    loadedLanguages: [],
    translations: {}
})
export const getters = {
    translations(state) {
        return state.translations
    },
    hasTranslation(state, getters) {
        return locale => !!getters.translations[locale]
    },
    locale(state) {
        return state.locale
    },
    existLocale(state, getters) {
        return locale => {
            return getters.locales.includes(locale)
        }
    },
    defaultLocale(state) {
        return state.defaultLocale
    },
    languages(state) {
        return state.languages
    },
    locales(state) {
        return state.languages.map(lang => lang.slug)
    },


}
export const mutations = {
    setTranslation(state, { locale, data }) {
        if (state.translations[locale]) return
        state.translations[locale] = data
    },
    setLoadedLanguages(state, languages) {
        state.loadedLanguages = languages
    },
    setLocales(state, locales) {
        state.locales = locales
    },
    setLocale(state, locale) {
        state.locale = locale
    },

    setLanguages(state, languages) {
        state.languages = languages
    },
    setDefaultLocale(state, locale) {
        state.defaultLocale = locale
    },
    initLocale(state, locale) {
        if(this.getters['i18n/locale']) return
        if (this.getters['i18n/existLocale'](locale)) {
            this.commit('i18n/setLocale', locale)

        } else {
            const cookieLocale = this.$cookies.get('locale')
            const defaultLocale = this.getters['i18n/defaultLocale']

            if (cookieLocale) {
                if (this.getters['i18n/existLocale'](cookieLocale)) {
                    this.commit('i18n/setLocale', cookieLocale)
                    return
                }
            }
            this.commit('i18n/setLocale', defaultLocale)

        }
    }
}
export const actions = {
    setLocale({ commit }, locale) {

        commit('setLocale', locale)
        this.$i18n.locale = locale
        this.$cookies.set('locale', locale, {
            maxAge: 60 * 60 * 24 * 30 * 12,
            path: '/'
        })
    },
    async init({ commit }, locale) {
        try {
            const languages = await this.$api.$get('languages')
            const defaultLangId = await this.$api.$get('settingByName', { name: 'language' })
            const defaultLang = languages.find(lang => lang._id === defaultLangId) || {}
            commit('setLanguages', languages)
            commit('setDefaultLocale', defaultLang.slug)
            commit('initLocale', locale)
        } catch (err) {
            this.$error(err)
        }

    },
    async loadLanguage({ state, commit }, locale) {
        if (state.loadedLanguages.includes(locale)) return
        const language = await this.$api.$get('language', { slug: locale })
        // this.$i18n.setLocaleMessage(locale, language)
        // commit('setLoadedLanguages', [...state.loadedLanguages, locale])

        return language
    }
}