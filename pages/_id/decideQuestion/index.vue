<template>
  <div>
    <p>ここはお題を決めるページ</p>
    <!-- 以下実際はタイマーでページ遷移 -->
    <!-- <NuxtLink to="/:id/thinkAnser">時間が来ました</NuxtLink> -->
    <div class="w-20 h-50">
      <Timer :time="Number(countDownTime)" :url="url" />
    </div>
    <UserList />
    <p>いいと思ったお題に投票しよう！</p>
    <ul>
      <li v-for="(question, key) in questions" :key="key">{{ question.createdUserName }} {{ question.title }}
        <button @click="voteQuestion(question.id)">good</button>
      </li>
    </ul>
    <div v-if=" maxVoteCount - voteCount > 0">
      <p>残り投票回数: {{ maxVoteCount - voteCount }}回</p>
    </div>
    <div v-else>
      <p>投票可能回数が上限に達しました</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      countDownTime: 30,
      url: '',
      questions: [],
      voteCount: 0,
      maxVoteCount: 10
    }
  },
  created () {
    this.url = '/' + this.$store.state.roomId + '/thinkAnser'
  },
  mounted () {
    this.showQuestions()
  },
  methods: {
    async showQuestions () {
      const url = '/theme/read/' + this.$store.state.roomId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        this.questions = response.data.themes
      }
    },
    async voteQuestion (questionId) {
      if (this.maxVoteCount > this.voteCount) {
        const url = '/theme/vote/' + questionId
        const response = await this.$axios.post(url, '')
        if (response.status === 200) {
          this.voteCount += 1
        }
      }
    }
  }
}
</script>
