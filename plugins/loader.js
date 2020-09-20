class Loader {
    constructor(store) {
        this.store = store
    }
    start() {
        this.store.commit('startLoading')
    }
    stop() {
        this.store.commit('stopLoading')
    }

}
export default ({ store }, inject) => {
    inject('loader', new Loader(store))
}