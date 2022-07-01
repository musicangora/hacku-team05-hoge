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
  async fetchTimerOffset ({ state, commit }, { url }) {
    let roomOffset = 0
    let reloadOffset = 0
    /*
    ゲーム進行時間 (経過時間ミリ秒)
    《timerコンポーネントに渡されるurl》
    - お題収集開始 00s 0:00 (0) 《decideQuestion》
    - お題決定開始 60s 1:00 (60000) 《thinkAnser》
    - 回答収集開始 30s 1:30 (90000) 《decideAnser》
    - 回答決定開始 60s 2:30 (150000) 《showFinalResult》
    - 回答決定完了 90s 4:00 (240000)
    予定開始時刻より3000ms以上遅れている場合に補正する
    */
    // startTime: 部屋の開始のミリ秒
    // startTimeTS: フェーズの開始のミリ秒 (リロード補正時のみ参照される)
    const nowDate = Date.now()
    let roomDiff = nowDate - state.startTime
    const nextPhase = url.split('/').pop()
    switch (nextPhase) {
      case 'decideQuestion':
        // なんもしない
        break
      case 'thinkAnser':
        roomDiff -= 60000
        break
      case 'decideAnser':
        roomDiff -= 90000
        break
      case 'showFinalResult':
        roomDiff -= 150000
        break
    }
    if (roomDiff > 5000 && state.startTimeTS === null) {
      roomOffset = parseInt((roomDiff / 1000))
    }

    if (state.startTimeTS === null) {
      if (roomDiff > 3000) {
        roomOffset = parseInt((roomDiff / 1000))
        commit('setStartTimeTS', nowDate - roomDiff)
      } else {
        commit('setStartTimeTS', nowDate)
      }
    } else {
      const stTime = await state.startTimeTS
      const diffTime = nowDate - stTime
      reloadOffset = parseInt((diffTime / 1000))
    }

    return roomOffset + reloadOffset
  },
  resetTimerTime ({ state, commit }) {
    commit('setStartTimeTS', null)
  }

}
export const getters = {
}

// export default createStore
