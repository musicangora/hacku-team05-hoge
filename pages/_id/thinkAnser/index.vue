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
      <div class="flex flex-col items-center h-full">
        <!--- お題パネル -->

        <p class="font-bold text-2xl text-ol-white-2 mb-0.5 mt-8">お題</p>
        <div
          class="flex items-center justify-center w-4/5 h-1/4 bg-my-yellow border-4 border-yellow-50 rounded-xl overflow-y-auto p-4 py-8 mb-4"
        >
          <NowQuestion />
        </div>

        <!--- テキスト入力 -->
        <TextInput ref="textInput" :type="'answer'" class="mt-16" />
        <p class="font-bold text-left text-sm text-my-black text-ol-white-2">
          タイマーがゼロになると自動送信されるよ！
        </p>
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
      countDownTime: 60,
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
