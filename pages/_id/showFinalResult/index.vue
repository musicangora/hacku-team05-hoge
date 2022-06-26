<template>
  <div>
    <p>ここは,最終結果のページ</p>
    <!-- 以下実際はタイマーでページ遷移 -->
    <NuxtLink to="/:id/decideQuestion">もう一度しましょう</NuxtLink>
    <p>参加メンバー</p>
    <ul>
      <!--TODO: V2でニックネームsend時にhost情報を付加してshow時にhost情報追加 -->
      <li v-for="(member, key) in members" :key="key">{{ member.name }}</li>
    </ul>
    <NowQuestion />
    <p>私たちの回答</p>
    <p>{{answer}}</p>
    <button @click.once="sendNickName">結果を共有！</button>
    <button @click.once="gameStart">もう一度！</button>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      members: [],
      answer: ''
    }
  },
  mounted () {
    this.showMember()
    this.requestAnswer()
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
    requestAnswer () {
      // 答えが返ってくる
      // const url = '/room/guests/' + this.$store.state.roomId
      // const response = await this.$axios.get(url, '')
      this.answer = 'ここが変わる'
    },
    async gameStart () {
      const url = '/room/active/' + this.$store.state.roomId
      const response = await this.$axios.post(url, '')
      if (response.status === 200) {
        // console.log(response.data)
        // this.$store.state.startTime = response.data.timestamp
        this.$store.commit('setStartTime', response.data.timestamp)
        this.$router.push(this.$store.state.roomId + '/collectQuestions')
      }
    }
  }
}
</script>
