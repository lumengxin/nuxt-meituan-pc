const state = () => ({
  app: []
})

const mutations = {
  add(state, text) {
    state.app.push(text)
  }
}

const action = {
  add: ({commit}, text) => {
    commit('add', text)
  }
}

export default {
  namespace: true,
  state,
  mutations,
  action
}
