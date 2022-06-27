<template>
  <div>
    <p>ここは待機ページ</p>
    <p>参加メンバー</p>
    <ul>
      <!--TODO: V2でニックネームsend時にhost情報を付加してshow時にhost情報追加 -->
      <li v-for="(member, key) in members" :key="key">{{ member.name }}</li>
    </ul>
    <input v-model="nickName" type="text" class="shadow">
    <button @click.once="sendNickName">確定</button>
    <div>
      <p>this page url</p>
      <p>{{ pageUrl }}</p>
    </div>
    <div v-if="host">
      <button @click.once="gameStart">ゲームスタート</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      members: [],
      nickName: '',
      host: false,
      pageUrl: '',
      waitInterval: null
    }
  },
  mounted () {
    this.pageUrl = window.location.href
    this.$store.commit('setRoomId', window.location.href.split('/').slice(-1)[0])
    this.host = this.$store.state.host
    // this.roomCreate()
    // this.$store.commit('setHost')
    // this.host = this.$store.state.host
    this.showMember()
  },
  methods: {
    showMember () {
      const self = this
      setInterval(function () { self.getAllMember() }, 5000)
    },
    async getAllMember () {
      const url = '/room/guests/' + this.$store.state.roomId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        this.members = response.data[0].guests
      }
    },
    async sendNickName () {
      const url = '/room/guests/' + this.$store.state.roomId
      const response = await this.$axios.post(url, { name: String(this.nickName) })
      if (response.status === 200) {
        this.$store.commit('setNickName', String(this.nickName))
        if (!this.host) {
          this.wait()
        }
      }
    },
    wait () {
      const self = this
      this.waitInterval = setInterval(function () { self.getActiveState() }, 3000)
    },
    async getActiveState () {
      const url = '/room/active/' + this.$store.state.roomId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        if (response.data.isActive) {
          // this.$store.state.startTime = response.data.timestamp
          this.$store.commit('setStartTime', Date.parse(response.data.timestamp))
          this.$router.push('/' + this.$store.state.roomId + '/collectQuestions')
          clearInterval(this.waitInterval)
        }
      }
    },
    async gameStart () {
      const url = '/room/active/' + this.$store.state.roomId
      const response = await this.$axios.post(url, '')
      if (response.status === 200) {
        this.$store.commit('setStartTime', Date.parse(response.data.timestamp))
        this.$router.push('/' + this.$store.state.roomId + '/collectQuestions')
      }
    }
  }
}
</script>
