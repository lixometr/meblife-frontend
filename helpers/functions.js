import _ from "lodash"
export const wordForm = (num, word) => {
      const cases = [2, 0, 1, 1, 1, 2];
      return word[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
}

export const filtersFromQuery = (query, stringify = false) => {
      if (!query) return

      let filters = _.cloneDeep(query)
      const notAttr = ['manufacturer', 'labels', 'price', 'delivery', 'sort_by', 'page']
      const noFilter = ['sort_by', 'page']
      const attributes = Object.keys(filters).filter(prop => notAttr.includes(prop) === false).map(prop => ({ name: prop, value: filters[prop].split(',') }))
      filters.attributes = attributes
      notAttr.forEach(filterName => {
            if (filterName === 'delivery') return
            if (filters[filterName]) {
                  filters[filterName] = filters[filterName].split(',')
            }
      })
      noFilter.forEach(noFilt => {
            delete filters[noFilt]
      })
      const normFilters = {}

      Object.keys(filters).filter(prop => attributes.findIndex(attr => attr.name === prop) < 0).map(prop => {
            normFilters[prop] = filters[prop]
      })

      if (stringify) {
            return JSON.stringify(normFilters)
      }
      return normFilters
}