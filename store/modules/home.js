const state = () => ({
  // 全部分类
  menu: [],
  // 热门景点
  hotPlace: []
})

const mutations = {
  setMenu(state, value) {
    state.menu = value
  },
  setHotPlace(state, value) {
    state.hotPlace = value
  }
}

const actions = {
  setMenu: ({ commit }, menu) => {
    commit('setMenu', menu)
  },
  setHotPlace: ({ commit }, hotPlace) => {
    commit('setHotPlace', hotPlace)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
