import createPersistedState from 'vuex-persistedstate'
// import Vuex from 'vuex'

export default ({ store }) => {
  createPersistedState({
    storage: window.sessionStorage
  })(store)
}
