import Api from "@/../api/api"
import ApiRoutes from "@/../api/api_routes"

export default async ({ app, $axios, store }, inject) => {
    store.commit('user/initToken')
    $axios.interceptors.request.use(config => {
        const token = store.getters['user/token']
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        config.params = Object.assign({}, {
            lang: app.i18n.locale,
            currency: store.getters.activeCurrency.slug
        }, config.params)
        return config
    })
    inject('api', new Api(ApiRoutes(), $axios, {}))
}