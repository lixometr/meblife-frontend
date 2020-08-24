const routes = {
    categories: '/category',
    category: '/category/{{slug}}',
    products: '/product/',
    product: '/product/{{slug}}',
    categoryProducts: '/category/{{slug}}/products',
    categoryChildren: '/category/{{slug}}/children',
    categoryChildrenAll: '/category/{{slug}}/children-all',
    categoryParents: '/category/{{slug}}/parents',
    categoriesPrimary: '/category/primary'
}
export default ({ version, baseUrl = '/api' } = {}) => {
    const Routes = {...routes}
    for (let key in routes) {
        if (version) {
            Routes[key] = `${baseUrl}${version}${Routes[key]}`
        } else {
            Routes[key] = `${baseUrl}${Routes[key]}`
        }
    }
    return Routes
}