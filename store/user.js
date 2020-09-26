
export const state = () => ({
    user: {},
    token: ''
})

export const getters = {
    token(state) {
        return state.token
    },
    isAuth(state) {
        return !!state.token
    },
    user(state) {
        return state.user;
    }
}

export const mutations = {
    initUser(state) {
        this.commit('user/initToken')
    },
    setUser(state, user) {
        state.user = user
    },
    setToken(state, {token, expires}) {
        let tokenExpires = expires
        this.$cookies.set('auth_token', token, {
            path: '/',
            maxAge: tokenExpires
        })
        state.token = token
    },
    initToken(state) {
        const token = this.$cookies.get('auth_token')
        state.token = token
    },
    logout(state) {
        state.token = ''
        state.user = {}
        this.$cookies.remove('auth_token', {
            path: '/'
        })
    }
}

export const actions = {
    async init({ commit }) {
        try {
            commit('initToken')
            if (this.getters['user/isAuth']) {
                const user = await this.$api.$get('userInfo')
                commit('setUser', user)
            }

        } catch (err) {
            this.$error(err)
        }
    },
    async login({ commit }, { email, password, remember }) {
        const result = await this.$api.$post('login', null, { email, password, remember })
        if (result.token) {
            commit('setToken', {token: result.token, expires: result.tokenExpires})
            await this.dispatch('favourite/init')
        }
        if (result.user) {
            commit('setUser', result.user)
        }
        return result

    },
    async signup({ commit }, { email, password, name }) {
        const result = await this.$api.$post('signup', null, { email, password, name })
        return result
    },
    async restorePassword({ }, { email }) {
        const result = await this.$api.$post('restorePassword', null, { email })
        return result
    },
    async changePassword({ }, data) {
        return this.$api.$put('changePassword', null, data)
    },
    logout({commit}) {
        commit('logout')
        this.dispatch('favourite/reset')
    }
}