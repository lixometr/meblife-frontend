class UrlBuilder {
    constructor(app) {
        this.path = {
            category: '/c/',
            product: '/p/',
            page: '/i/',
            search: '/search/',
            manufacturer: '/m/',
            inspirations: '/inspirations/',
            looks: '/shop-the-looks/',
            showroom: '/showroom/',
        }
        this.app = app;
    }
    category(slug) {
        return this.app.localePath(this.path.category + slug)
    }
    product(slug) {
        return this.app.localePath(this.path.product + slug)

    }
    page(slug) {
        return this.app.localePath(this.path.page + slug)
    }
    manufacturer(slug) {
        return this.app.localePath(this.path.manufacturer + slug)
    }
    inspirations(slug) {
        return this.app.localePath(this.path.inspirations + slug)
    }
}
export default ({ app }, inject) => {
    inject('url', new UrlBuilder(app))
}