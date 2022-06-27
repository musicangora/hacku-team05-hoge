
<template>
  <div>
    <p>ここは,自分の回答を入力するページ</p>
    <div class="w-20 h-50">
      <Timer :time="Number(countDownTime)" :url="url" :is-answer="true" :post-answer="postAnswer" />
    </div>
    <UserList />
    <NowQuestion />
    <TextInput ref="textInput" :type="'answer'" />
    <!-- 以下実際はタイマーでページ遷移 -->
    <!-- <NuxtLink to="/:id/decideAnser">時間が来ました</NuxtLink> -->
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      countDownTime: 50,
      url: '/:id/decideAnser',
      questions: []
    }
  },
  created () {
    // this.setCountDownTime()
    this.url = '/' + this.$store.state.roomId + '/decideAnser'
  },
  mounted () {
    // this.roomCreate()
    // this.showQuestions()
  },
  methods: {
    // setCountDownTime () {
    //   this.startTime = Date.parse(this.$store.state.StartTIme)
    //   // this.startTime = Date.now() - 3000
    //   this.now = Date.now()
    //   this.diff = (this.now - this.startTime) / 1000
    //   this.countDownTime = this.countDownTime - this.diff // 全体の同期のために誤差を修正
    // },
    postAnswer () {
      this.$refs.textInput.sendText()
    }
  }
}
</script>
