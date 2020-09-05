const state = () => ({
  list: ['a', 'b', 'c']
})

const mutations = {
  add(state, text) {
    state.list.push(text)
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
