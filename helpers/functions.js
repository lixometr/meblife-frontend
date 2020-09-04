import _ from "lodash"
export const wordForm = (num, word) => {
      const cases = [2, 0, 1, 1, 1, 2];
      return word[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
}

export const filtersFromQuery = (query, stringify = false) => {
      if(!query) return
     
      let filters =  _.cloneDeep(query)
      const notAttr = ['manufacturer', 'labels', 'price', 'delivery', 'sort_by']
      const noFilter = ['sort_by']
      const attributes = Object.keys(filters).filter(prop => notAttr.includes(prop) === false).map(prop => ({ name: prop, value: filters[prop].split(',') }))
      filters.attributes = attributes
      if (filters.price) {
          filters.price = filters.price.split(',')
      }
      noFilter.forEach(noFilt => {
            delete filters[noFilt]
      })
      if(stringify) {
            return JSON.stringify(filters)
      }
      return filters
}