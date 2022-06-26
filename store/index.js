import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      roomId: -1,
      host: false
    },
    mutations: {
      setRoomId (state, roomid) {
        state.roomId = roomid
      },
      setHost (state) {
        state.host = true
      }
    },
    actions: {},
    getters: {}
  })
}

export default createStore
