<template>
  <div>
    <p>ここはお題を考えるページ</p>
    <!-- <TextInput :type="'question'" @postComplete="showSnackbar" /> -->
    <div class="w-20 h-50">
      <Timer :time="Number(countDownTime)" :url="url" />
    </div>
    <UserList />
    <p>みんなが考えたお題</p>
    <ul>
      <li v-for="(question, key) in questions" :key="key">{{ question.createdUserName }} {{ question.title }}</li>
    </ul>
    <p>議論のお題を考えよう</p>
    <TextInput :type="'question'" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      countDownTime: 50,
      url: '/:id/decideQuestion',
      isSnackbarShowing: false,
      questions: []
    }
  },
  created () {
    this.url = '/' + this.$store.state.roomId + '/decideQuestion'
    this.setCountDownTime()
  },
  mounted () {
    this.showQuestions()
  },
  methods: {
    setCountDownTime () {
      this.startTime = this.$store.state.startTime
      this.now = Date.now()
      this.diff = parseInt((this.now - this.startTime) / 1000)
      this.countDownTime = this.countDownTime - this.diff // 全体の同期のために誤差を修正
    },
    showQuestions () {
      const self = this
      setInterval(function () { self.getQuestions() }, 5000)
    },
    async getQuestions () {
      const url = '/theme/read/' + this.$store.state.roomId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        this.questions = response.data.themes
      }
    }
  }
}
</script>
