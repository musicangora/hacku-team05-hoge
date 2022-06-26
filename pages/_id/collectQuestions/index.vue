<template>
  <div>
    <!-- <div v-if="isSnackbarShowing" class="bg-blue-100 border border-blue-500 text-blue-700 px-4 py-4 mx-4 rounded" role="alert">
      <p class="font-bold">お題を提案しました！</p>
      <p class="text-sm">お題は何個でも提案できます。他のお題も考えてみましょう！</p>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="closeSnackbar">
        <svg class="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
      </span>
    </div> -->
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
      countDownTime: 180,
      url: '/:id/decideQuestion',
      isSnackbarShowing: false,
      questions: []
    }
  },
  created () {
    this.setCountDownTime()
    this.url = this.$store.state.roomId + '/decideQuestion'
  },
  mounted () {
    // this.roomCreate()
    this.showQuestions()
  },
  methods: {
    setCountDownTime () {
      this.startTime = Date.parse(this.$store.state.StartTIme)
      // this.startTime = Date.now() - 3000
      this.now = Date.now()
      this.diff = (this.now - this.startTime) / 1000
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
        // console.log(this.questions)
      }
    }
    // async roomCreate () {
    //   const url = '/room/create'
    //   const response = await this.$axios.post(url)
    //   if (response.status === 200) {
    //     console.log(response.data.room_id)
    //     this.$store.commit('setRoomId', response.data.room_id)
    //     this.sendNickName()
    //   }
    // },
    // async sendNickName () {
    //   const url = '/room/guests/' + this.$store.state.roomId
    //   const response = await this.$axios.post(url, { name: String('sample') })
    //   if (response.status === 200) {
    //     this.$store.commit('setNickName', String('sample'))
    //     // console.log(response.data)
    //   }
    // }
    // showSnackbar () {
    //   this.isSnackbarShowing = true
    // },
    // closeSnackbar () {
    //   this.isSnackbarShowing = false
    // }

  }
}
</script>
