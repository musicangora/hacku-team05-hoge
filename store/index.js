import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      roomId: -1,
      host: false,
      startTime: 0
    },
    mutations: {
      setRoomId (state, roomid) {
        state.roomId = roomid
      },
      setHost (state) {
        state.host = true
      },
      setStartTime (state, startTime) {
        state.startTime = startTime
      }
    },
    actions: {},
    getters: {}
  })
}

export default createStore
