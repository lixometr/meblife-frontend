const panels = {
    'panel-contact': () => import('@/components/Panels/PanelContact'),
    'panel-installments': () => import('@/components/Panels/PanelInstallments'),
    'panel-filters': () => import("@/components/Panels/PanelFilters"),
    'panel-sub-filters': () => import("@/components/Panels/PanelFilters/SubFilter"),
    'panel-look': () => import("@/components/Panels/PanelLook"),
    'panel-cart': () => import("@/components/Panels/PanelCart"),
    'panel-categories': () => import("@/components/Panels/PanelCategories"),
    'slider-modal': () => import("@/components/Modals/SliderModal"),
    'modal-search': () => import("@/components/Modals/SearchModal"),
    'modal-loading': () => import("@/components/Modals/LoadingModal")
};
export const state = () => ({

    options: {
        'panel-contact': {

        },
        'panel-installments': {},
        'panel-filters': {},
        'sub-filter-panel': {},
        'panel-look': {},
        'panel-cart': {},
        'panel-categories': {
            shiftX: 0,
            transition: 'slideRight',

        },
        'slider-modal': {
            name: 'slider-modal',
            transition: 'fade',
            classes: ['slider-modal__modal'],
            class: 'slider-modal',
            height: "100%",
            width: "100%",
            adaptive: true
        },
        'modal-search': {
            name: 'search-modal',
            transition: 'fade',
            classes: ['search-modal__modal'],
            class: 'search-modal',
            height: "100%",
            width: "100%",
            adaptive: true
        },
        'modal-loading': {
            name: 'modal-loading',
            transition: 'fade',
            classes: ['loading-modal__modal'],
            class: 'loading-modal',
            height: "100%",
            width: "100%",
            adaptive: true
        },

    }
})
export const actions = {
    async open({ state }, { name, props, events }) {
        const defaultOptions = {
            class: "panel-modal",
            height: "100%",
            width: "420px",
            shiftX: 1,
            transition: 'slideLeft',
            overlayTransition: "panel-overlay",
            classes: ['panel-modal__modal'],
            adaptive: true
        }
        const { default: component } = await panels[name]()
        const options = { ...defaultOptions, ...state.options[name] };
        this._vm.$modal.show(component, props, options, events)
    },
    close({state}, {name}) {
        this._vm.$modal.hide(name)
    }

}