// import Vuex from 'vuex'

export const state = () => ({
  roomId: 0,
  host: false,
  startTime: 0,
  startTimeTS: null,
  nowThemeInfo: {},
  members: [],
  nowThemeId: 0,
  myNickName: ''
})

export const mutations = {
  setRoomId (state, roomid) {
    state.roomId = roomid
  },
  setHost (state) {
    state.host = true
  },
  setStartTime (state, startTime) {
    state.startTime = startTime
    state.startTimeTS = startTime
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
  },
  setStartTimeTS (state, ts) {
    state.startTimeTS = ts
  }

}

export const actions = {
  async fetchTimerOffset ({ state, commit }) {
    if (state.startTimeTS === null) {
      const date = Date.now()
      commit('setStartTimeTS', date)
      return 0
    } else {
      const nowDate = Date.now()
      const stTime = await state.startTimeTS
      const diffTime = nowDate - stTime
      return parseInt((diffTime / 1000))
    }
  },
  resetTimerTime ({ state, commit }) {
    commit('setStartTimeTS', null)
  }

}
export const getters = {
}

// export default createStore
