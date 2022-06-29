<template>
  <div>
    <p>ここは,最終結果のページ</p>
    <!-- 以下実際はタイマーでページ遷移 -->
    <!-- <NuxtLink to="/:id/decideQuestion">もう一度しましょう</NuxtLink> -->
    <p>参加メンバー</p>
    <ul>
      <li v-for="(member, key) in members" :key="key">{{ member.name }}</li>
    </ul>
    <NowQuestion />
    <p>最も共感を集めた回答はこれだ！</p>
    <p>{{ answer.createdUserName }}</p>
    <p>{{ answer.title }}</p>
    <button>結果を共有！</button>
    <div v-if="host">
      <button @click.once="gameRestart">もう一度！</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      members: [],
      answer: {},
      host: false,
      intervalId: null
    }
  },
  mounted () {
    this.getAllMember()
    this.showMaxAnser()
    this.host = this.$store.state.host
    const self = this
    setInterval(function () { self.checkNextGame() }, 5000)
  },
  methods: {
    getAllMember () {
      this.members = this.$store.state.members
    },
    showMaxAnser () {
      const self = this
      this.intervalId = setInterval(function () { self.getMaxAnswer() }, 1000)
    },
    async getMaxAnswer () {
      const url = '/answer/max/' + this.$store.state.nowThemeId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        if (response.data.linkedAnser.length === this.$store.state.members.length) {
          this.answer = response.data.linkedAnser[0]
          clearInterval(this.intervalId)
        } else {
          this.answer = response.data[0]
        }
      }
    },
    async gameRestart () {
      const url = '/room/create'
      const response = await this.$axios.post(url)
      if (response.status === 200) {
        this.$store.commit('setRoomId', response.data.room_id)
        this.$store.commit('setHost')
        await this.$axios.post('/room/guests/' + response.data.room_id, {
          name: String(this.$store.state.myNickName)
        })
        this.$router.push('/' + this.$store.state.roomId)
      }
    },

    checkNextGame () {
      // this.$router.push('/' + this.$store.state.roomId + '/collectQuestions')
    }
  }
}
</script>
