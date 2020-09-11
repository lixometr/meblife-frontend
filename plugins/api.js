import Api from "@/../api/api"
import ApiRoutes from "@/../api/api_routes"
export default async ({ app, $axios, store }, inject) => {
    inject('api', new Api(ApiRoutes(), $axios.create({
        headers: {
            // 'X-Language': app.i18n.locale,
            // 'X-Currency': store.getters.activeCurrency.slug || ''
        }
    }), {
        lang: app.i18n.locale,
        currency: store.getters.activeCurrency.slug
    }))
}