<template>
  <div class="flex items-center justify-center bg-yellow-300 h-screen w-full">
    <!--- メインパネル -->
    <div
      class="flex flex-col w-[1024px] h-[660px] border-4 border-yellow-400 rounded-3xl"
    >
      <!--- ヘッダー -->
      <div
        class="h-20 mx-10 my-8 flex justify-between items-center text-center"
      >
        <div class="flex flex-col justify-center items-center">
          <img class="w-20 mb-1" src="~assets/images/hacku-05.png" />
          <UserList />
        </div>
        <div>
          <h2 class="font-bold text-3xl text-red-500 text-ol-white-2 mb-1">
            議論のお題を考えよう！
          </h2>
        </div>
        <div class="w-20 h-20">
          <Timer :time="Number(countDownTime)" :url="url" />
        </div>
      </div>
      <!-- <TextInput :type="'question'" @postComplete="showSnackbar" /> -->

      <div class="flex flex-col items-center h-full">
        <!--- お題パネル -->
        <p
          class="font-bold text-left text-sm text-ol-white-2 mb-1 transform -translate-x-72"
        >
          みんなの考えたお題
        </p>
        <ul
          class="flex flex-wrap items-center w-3/4 h-2/3 bg-my-yellow border-4 border-yellow-50 rounded-xl overflow-y-scroll p-4 py-8 mb-4"
        >
          <li
            v-for="(question, key) in questions"
            :key="key"
            class="flex flex-col justify-center bg-yellow-50 text-sm font-bold text-my-black h-11 w-80 text-left pl-8 m-4 mb-8 rounded-r-md rounded-l-full"
          >
            <p
              class="font-bold text-left text-xs text-ol-white-2 pb-2 transform -translate-y-4"
            >
              {{ question.createdUserName }}
            </p>
            <p class="text-base transform -translate-y-3">
              {{ question.title }}
            </p>
          </li>
          <!-- <li
            class="flex flex-col justify-center bg-yellow-50 text-sm font-bold text-my-black h-11 w-80 text-left pl-8 m-4 mb-8 rounded-r-md rounded-l-full"
          >
            <p
              class="font-bold text-left text-xs text-ol-white-2 pb-2 transform -translate-y-4"
            >
              ニックネーム
            </p>
            <p class="text-base transform -translate-y-3">
              「あ」から始まる食べ物は？
            </p>
          </li> -->
        </ul>
        <!-- <p>確定したら反映されるよ！</p> -->

        <!--- テキスト入力 -->
        <TextInput :type="'question'" />
        <p class="font-bold text-left text-xs text-my-black text-ol-white-2">
          みんなのお題例も参考にしながらお題を考えよう！
        </p>
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
      url: '/:id/decideQuestion',
      isSnackbarShowing: false,
      questions: []
    }
  },
  created() {
    this.url = '/' + this.$store.state.roomId + '/decideQuestion'
    this.setCountDownTime()
  },
  mounted() {
    this.showQuestions()
  },
  methods: {
    setCountDownTime() {
      this.startTime = this.$store.state.startTime
      console.log(this.startTime)
      this.now = Date.now()
      console.log(this.now)
      this.diff = parseInt((this.now - this.startTime) / 1000)
      console.log(this.diff)
      // this.countDownTime = this.countDownTime - this.diff // 全体の同期のために誤差を修正
    },
    showQuestions() {
      const self = this
      setInterval(function () {
        self.getQuestions()
      }, 5000)
    },
    async getQuestions() {
      const url = '/theme/read/' + this.$store.state.roomId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        this.questions = response.data.themes
      }
    }
  }
}
</script>
