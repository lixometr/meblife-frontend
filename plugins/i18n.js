import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default async ({ app, store, params, $api }, inject) => {
    await store.dispatch('i18n/init', params.lang)
    let messages = {...store.getters['i18n/translations']}
    const instance = new VueI18n({
        locale: store.getters['i18n/locale'],
        fallbackLocale: store.getters['i18n/defaultLocale'],
        messages
    })
    app.i18n = instance

    app.localePath = (link) => {
        return `/${app.i18n.locale}${link}`
    }
    app.loadlLocale = async (locale) => {
        if(store.getters['i18n/hasTranslation'](locale)) return
        const language = await $api.$get('language', { slug: locale })
        app.i18n.setLocaleMessage(locale, {...language})
        store.commit('i18n/setTranslation', {locale, data: {...language}})
    }


    inject('i18n', instance)
}
