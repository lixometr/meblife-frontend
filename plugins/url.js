import _ from "lodash"
class UrlBuilder {
    constructor(app) {
        this.path = {
            category: '/c/',
            product: '/p/',
            page: '/i/',
            search: '/search/',
            manufacturer: '/m/',
            inspiration: '/inspiration/',
            look: '/shop-the-look/',
            showroom: '/showroom/',
            account: '/account/',
            cart: '/cart/',
            search: '/search/'
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
    inspiration(slug) {
        return this.app.localePath(this.path.inspiration + slug)
    }
    look(slug) {
        return this.app.localePath(this.path.look + slug)

    }
    filter(categorySlug, nameSlug, valueSlug) {
        let values = valueSlug;
        if (_.isArray(valueSlug)) {
            values = valueSlug.join(',')
        }
        const url = `${this.path.category}${categorySlug}?${nameSlug}=${values}`
        return this.app.localePath(url)

    }
    account(slug) {
        return this.app.localePath(this.path.account + slug)
    }
    cart(slug) {
        return this.app.localePath(this.path.cart + slug)
    }
    search(slug) {
        return this.app.localePath(this.path.search + slug)
    }
}
export default ({ app }, inject) => {
    inject('url', new UrlBuilder(app))
}