<template>
  <div class="flex items-center justify-center bg-yellow-300 h-screen w-full">
    <!--- メインパネル -->
    <div
      class="flex flex-col w-[1024px] h-[660px] border-4 border-yellow-400 rounded-3xl"
    >
      <!--- ヘッダー -->
      <HeaderComponent
        :type="'collect'"
        :time="Number(countDownTime)"
        :url="url"
      />
      <!-- <TextInput :type="'question'" @postComplete="showSnackbar" /> -->

      <div class="flex flex-col items-center h-full">
        <!--- お題パネル -->
        <p
          class="font-bold text-left text-sm text-ol-white-2 mb-1 transform -translate-x-72"
        >
          みんなの考えたお題
        </p>
        <ul
          class="flex flex-wrap items-center w-3/4 h-2/3 bg-my-yellow border-4 border-yellow-50 rounded-xl overflow-y-auto p-4 py-8 mb-2"
        >
          <!-- <li
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
          </li> -->
          <ListPanel
            v-for="(question, key) in questions"
            :key="key"
            :user-name="question.createdUserName"
            :title="question.title"
          />
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
import ListPanel from '../../../components/listPanel.vue'
export default {
  name: 'IndexPage',
  components: { ListPanel },
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
