const state = () => ({
  position: {}
})

const mutations = {
  setPosition(state, value) {
    state.position = value
  }
}

const actions = {
  setPosition: ({ commit }, position) => {
    commit('setPosition', position)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
