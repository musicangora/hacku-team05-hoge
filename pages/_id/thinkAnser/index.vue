<template>
  <div class="flex items-center justify-center bg-yellow-300 h-screen w-full">
    <!--- メインパネル -->
    <div
      class="flex flex-col w-[1024px] h-[660px] border-4 border-yellow-400 rounded-3xl"
    >
      <!--- ヘッダー -->
      <HeaderComponent
        :type="'think'"
        :time="Number(countDownTime)"
        :url="url"
        :is-answer="true"
        :post-answer="postAnswer"
      />
      <!-- <div class="w-20 h-50">
        <Timer
          :time="Number(countDownTime)"
          :url="url"
          :is-answer="true"
          :post-answer="postAnswer"
        /> -->
      <div class="flex flex-col items-center h-full">
        <!--- お題パネル -->
        <p class="font-bold text-xl text-ol-white-2 mb-1">お題</p>
        <div
          class="flex flex-wrap items-center w-3/4 h-2/3 bg-my-yellow border-4 border-yellow-50 rounded-xl overflow-y-auto p-4 py-8 mb-4"
        />

        <!-- <UserList /> -->
        <NowQuestion />
        <p>お題に関する自分なりの回答を考えよう！</p>
        <p>タイマーがゼロになり自動送信されるまでじっくり考えよう！</p>
        <TextInput ref="textInput" :type="'answer'" />
        <!-- 以下実際はタイマーでページ遷移 -->
        <!-- <NuxtLink to="/:id/decideAnser">時間が来ました</NuxtLink> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      countDownTime: 60000000, // DEBUG
      url: '/:id/decideAnser',
      questions: []
    }
  },
  created() {
    // this.setCountDownTime()
    this.url = '/' + this.$store.state.roomId + '/decideAnser'
  },
  mounted() {
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
    postAnswer() {
      this.$refs.textInput.sendText()
    }
  }
}
</script>
