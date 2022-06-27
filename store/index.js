import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      roomId: 0,
      host: false,
      startTime: 0,
      nowThemeInfo: {},
      members: [],
      nowThemeId: 0,
      myNickName: ''
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
      },
      setNowThemeId (state, themeId) {
        state.nowThemeId = themeId
      },
      setNickName (state, nickName) {
        state.myNickName = nickName
      }
    },
    actions: {},
    getters: {}
  })
}

export default createStore
