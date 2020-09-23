import { filtersFromQuery } from "@/helpers/functions";
import _ from "lodash";
export const state = () => ({
    /*
        {
            attr-name: [attr-value],
            attributes: [
                {
                    name: {attr-name},
                    value: [{attr-value}]
                }
            ]
        }
    */
    items: [],
    /*
        {
            attr-name: ['attr-value-slug'],
            attributes: [
                {
                    name: 'attr-name',
                    value: ['attr-value-slug']
                }
            ]
        }
    */
    values: {},
    sortBy: undefined,
    delivery: undefined,
    page: undefined,
    noAttrFields: {}

})
export const getters = {
    /*
       values = {
         attr-slug: [{name: "", slug: ""}]
       }
       to
       {
         attr-slug: slug,slug
       }
     */
    getFiltersToQuery(state, getters) {
        return (values) => {
            const newValues = {};
            Object.keys(values).forEach((valueSlug) => {
                if (!values[valueSlug]) return
                const filterType = getters.getFilterType(
                    valueSlug
                );
                let value = values[valueSlug].reduce((str, item, index) => {
                    if (filterType === "decimal") {
                        str += item;
                    } else {
                        str += item.slug;
                    }
                    if (index < values[valueSlug].length - 1) {
                        str += ",";
                    }
                    return str;
                }, "");
                if (!value) return

                newValues[valueSlug] = value;
            });
            return newValues
        }
    },
    filtersToQuery(state, getters) {
        let query = {}
        const filters = getters.getFiltersToQuery(getters.valueObj)
        query = { ...query, ...filters }
        if (getters.sortBy) {
            query.sort_by = getters.sortBy

        }
        if (getters.delivery) {
            query.delivery = getters.delivery
        }
        if (getters.page) {
            query.page = getters.page

        }
        return query
    },
    delivery(state) {
        return state.delivery || undefined
    },
    sortBy(state) {
        return state.sortBy
    },
    page(state) {
        return state.page
    },
    getFilterType(state, getters) {
        return (slug) => {
            const item = getters.allFilterItems.find(filterItem => filterItem.name.slug === slug)
            if (!item) return
            return item.name.attribute_type
        }
    },
    getFilterName(state, getters) {
        return (slug) => {
            const item = getters.allFilterItems.find(item => item.name.slug === slug)
            if (!item) return
            return item.name.name
        }
    },

    /*
    {
        attr-name-slug: [{attr-value}]
    }
    */
    valueObj(state, getters) {
        const notAttrFilterItems = getters.notAttrFilterItems
        const activeValues = state.values
        const filterItems = getters.allFilterItems
        const allValuesObj = getters.allValuesObj
        let result = {}
        Object.keys(allValuesObj).forEach(valueNameSlug => {
            const inFilterItems = filterItems.find(fItem => fItem.name.slug === valueNameSlug)
            if (!inFilterItems) return
            const filterType = inFilterItems.name.attribute_type
            let filterActiveValues = []
            if (filterType === 'decimal') {
                filterActiveValues = allValuesObj[valueNameSlug]
            } else {
                filterActiveValues = inFilterItems.value.filter(filterValue => {
                    return allValuesObj[valueNameSlug].includes(filterValue.slug)

                })
            }
            result[valueNameSlug] = filterActiveValues
        })
        return result
    },
    /*
    {
        attr-name-slug: ['attr-value']
    }
    */
    allValuesObj(state, getters) {
        const result = { ...getters.notAttrFilterValues }
        const valueAttributes = state.values && state.values.attributes
        if (!valueAttributes) return result

        valueAttributes.map(valueAttr => {
            result[valueAttr.name] = valueAttr.value
        })
        return result
    },
    /*
        [
            {
                name: {},
                value: {}
            }
        ]
    */
    allFilterItems(state, getters) {
        return [...getters.notAttrFilterItems, ...getters.attribteFilterItems]
    },
    attribteFilterItems(state) {
        return state.items && state.items.attributes || []
    },
    notAttrFilterItems(state, getters) {
        const filterItems = state.items;
        const noAttrs = Object.keys(filterItems)
            .filter((prop) => {
                if (prop === "attributes") return false;
                if (_.isEmpty(filterItems[prop])) return false;
                return true;
            })
            .map((prop) => {
                return {
                    name: {
                        name: state.noAttrFields[prop],
                        slug: prop,
                        attribute_type: prop === "price" ? "decimal" : "values",
                    },
                    value: filterItems[prop],
                };
            });
        return noAttrs || [];
    },
    isAttribute(state, getters) {
        return (slug) => {
            return !Object.keys(getters.notAttrFilterValues).includes(slug)
        }
    },
    /*
    {
        attr-name-slug: ['attr-value-slug']
    }
    */
    notAttrFilterValues(state) {
        const filterValues = state.values;
        const result = {}
        Object.keys(filterValues)
            .filter((prop) => {
                if (prop === "attributes") return false;
                if (_.isEmpty(filterValues[prop])) return false;
                return true;
            })
            .map((prop) => {
                result[prop] = filterValues[prop]
            });
        return result || {};
    }
}
export const mutations = {
    setItems(state, items) {
        state.items = items || {}
    },
    setValues(state, values) {
        state.values = values
    },

    setValuesFromValues(state, values) {
        const newValues = this.getters['filters/getFiltersToQuery'](values)
        const newItems = filtersFromQuery(newValues)

        this.commit("filters/setValues", newItems);
        this.commit("filters/resetPage");
    },
    setSort(state, sortBy) {
        state.sortBy = sortBy
        this.commit("filters/resetPage");

    },
    setDelivery(state, delivery) {
        state.delivery = delivery
        this.commit("filters/resetPage");

    },
    setPage(state, page) {
        state.page = page
    },
    resetPage(state, page) {
        state.page = undefined
    },
    removeFilter(state, slug) {
        const isAttr = this.getters['filters/isAttribute'](slug)
        if (isAttr) {
            const attributes = state.values.attributes.filter(attr => attr.name !== slug)
            const newValues = { ...state.values, attributes }
            this.commit("filters/setValues", newValues);

        } else {
            const newValues = { ...state.values }
            newValues[slug] = undefined
            this.commit("filters/setValues", newValues);

        }
    },
    resetFilterValues(state) {
        this.commit('filters/setValues', filtersFromQuery({}))
        this.commit('filters/setSort')
        this.commit('filters/setDelivery')
    },
    init(state, query = {}) {
        const filterValues = filtersFromQuery(query)
        this.commit('filters/setValues', filterValues)
        this.commit('filters/setSort', query.sort_by)
        this.commit('filters/setDelivery', query.delivery)
        state.noAttrFields = this.app.i18n.t('filters')
    }
}
export const actions = {
    init({ commit }, query) {
        commit('init', query)
    },
    apply() {
        this.$router.push({
            query: { ...this.getters["filters/filtersToQuery"] },
        });
    }
}