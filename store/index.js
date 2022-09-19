export const state = () => ({
    id: '',
    content: {},
})

export const mutations = {
    getId (state, payload) {
        state.id = payload
    },
    getContent (state, payload) {
        state.content = payload
    },
    getDefaultState (state) {
        state.id = ''
        state.content = ''
    }
}

export const actions = {
    getItens(context, payload) {
        context.commit("STORE", payload)
    }
}