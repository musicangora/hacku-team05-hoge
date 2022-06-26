<template>
  <div>
    <p>ここは,最終結果のページ</p>
    <!-- 以下実際はタイマーでページ遷移 -->
    <!-- <NuxtLink to="/:id/decideQuestion">もう一度しましょう</NuxtLink> -->
    <p>参加メンバー</p>
    <ul>
      <!--TODO: V2でニックネームsend時にhost情報を付加してshow時にhost情報追加 -->
      <li v-for="(member, key) in members" :key="key">{{ member.name }}</li>
    </ul>
    <NowQuestion />
    <p>私たちの回答</p>
    <p>{{ answer.createdUserName }}</p>
    <p>{{ answer.title }}</p>
    <button @click.once="sendNickName">結果を共有！</button>
    <div v-if="host">
      <button @click.once="gameStart">もう一度！</button>
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
      host: false
    }
  },
  mounted () {
    this.getAllMember()
    this.requestAnswer()
    this.host = this.$store.state.host
  },
  methods: {
    getAllMember () {
      this.members = this.$store.state.members
    },
    async requestAnswer () {
      const url = '/answer/max/' + this.$store.state.nowThemeId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        this.answer = response.data[0].linkedAnser[0]
      }
    },
    gameStart () {
      this.$router.push(this.$store.state.roomId + '/collectQuestions')
    }
  }
}
</script>
