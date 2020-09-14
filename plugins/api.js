import Api from "@/../api/api"
import ApiRoutes from "@/../api/api_routes"

export default async ({ app, $axios, store }, inject) => {
    $axios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${store.getters['user/token']}`
        config.params = Object.assign({}, {
            lang: app.i18n.locale,
            currency: store.getters.activeCurrency.slug
        }, config.params)
        return config
    })
    inject('api', new Api(ApiRoutes(), $axios, {}))
}