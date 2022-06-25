import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      roomId: -1,
      host: false,
      startTime: 0,
      nowThemeInfo: {},
      members: []
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
      },
      setNowThemeInfo (state, theme) {
        state.nowThemeInfo = theme
      },
      setMembers (state, members) {
        state.members = members
      }
    },
    actions: {},
    getters: {}
  })
}

export default createStore
