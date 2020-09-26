const panels = {
    'panel-contact': () => import('@/components/Panels/PanelContact'),
    'panel-installments': () => import('@/components/Panels/PanelInstallments'),
    'panel-filters': () => import("@/components/Panels/PanelFilters"),
    'panel-sub-filters': () => import("@/components/Panels/PanelFilters/SubFilter"),
    'panel-look': () => import("@/components/Panels/PanelLook"),
    'panel-cart': () => import("@/components/Panels/PanelCart"),
    'panel-categories': () => import("@/components/Panels/PanelCategories"),
    'slider-modal': () => import("@/components/Modals/SliderModal"),
    'modal-menu': () => import("@/components/Modals/MenuModal"),
    'modal-search': () => import("@/components/Modals/SearchModal"),
    'modal-loading': () => import("@/components/Modals/LoadingModal"),
    'panel-login': () => import("@/components/Panels/PanelLogin"),
    'panel-account': () => import("@/components/Panels/Account/PanelAccount"),
    'panel-account.personalData': () => import("@/components/Panels/Account/PanelPersonalData"),
    'panel-account.changePersonalData': () => import("@/components/Panels/Account/PanelChangePersonalData"),
    'panel-account.changePassword': () => import("@/components/Panels/Account/PanelChangePassword"),
    'panel-account.changeEmail': () => import("@/components/Panels/Account/PanelChangeEmail"),
    'panel-account.addressesInvoice': () => import("@/components/Panels/Account/PanelAddressesInvoice"),
    'panel-account.changeAddressesInvoice': () => import("@/components/Panels/Account/PanelChangeAddressesInvoice"),
    'panel-account.addresses': () => import("@/components/Panels/Account/PanelAddresses"),
    'panel-favourite': () => import("@/components/Panels/PanelFavourite"),
    'panel-product-preview': () => import("@/components/Panels/PanelProductPreview"),
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
        'panel-login': {},
        'panel-product-preview': {},
        'panel-account.addressesInvoice': {
            login: true
        },
        'panel-account.changeAddressesInvoice': {
            login: true
        },
        'panel-account.addresses': {
            login: true
        },
        'panel-account.personalData': {
            login: true
        },
        'panel-account.changePassword': {
            login: true
        },
        'panel-account.changeEmail': {
            login: true
        },
        'panel-account.changePersonalData': {
            login: true
        },
        'panel-favourite': {
            login: true
        },
        'panel-account': {
            login: true
        },
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
        'modal-menu': {
            name: 'modal-menu',
            transition: 'fade',
            classes: ['menu-modal__modal'],
            class: 'menu-modal',
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
    },
    afterLoginOpen: ''
})
export const mutations = {
    setAfterLoginOpen(state, val) {
        state.afterLoginOpen = val
    }
}
export const actions = {
    async open({ commit, state }, { name, props, events }) {
        const defaultOptions = {
            class: "panel-modal",
            height: "100%",
            width: "420px",
            shiftX: 1,
            transition: 'slideLeft',
            overlayTransition: "panel-overlay",
            classes: ['panel-modal__modal'],
            adaptive: true,
            login: false
        }
        const { default: component } = await panels[name]()
        const options = { ...defaultOptions, ...state.options[name] };
        if (options.login) {
            if (!this.getters['user/isAuth']) {
                const { default: component } = await panels['panel-login']()
                this._vm.$modal.show(component, { success: () => this.dispatch('modal/afterLogin'), ...props }, options, events)
                commit('setAfterLoginOpen', name)

                return
            }
        }
        this._vm.$modal.show(component, props, options, events)
        commit('setAfterLoginOpen', '')

    },
    afterLogin({ state }) {
        this.dispatch('modal/closeAll', { name: 'panel-login' })
        this.dispatch('modal/open', { name: state.afterLoginOpen })
    },
    close({ state }, { name }) {
        this._vm.$modal.hide(name)
    },
    closeAll() {
        this._vm.$modal.hideAll()

    }

}