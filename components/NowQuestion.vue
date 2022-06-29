<template>
  <div>
    <p class="font-bold text-lg text-red-500 text-ol-white-2 mb-1">お題</p>
    <h3 class="font-bold text-3xl text-yellow-50 text-ol-black-2 mb-1">
      {{ question.title }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'NowQuestion',
  data() {
    return {
      question: {}
    }
  },
  mounted() {
    this.getNowQuestion()
  },
  methods: {
    async getNowQuestion() {
      if (!Object.keys(this.$store.state.nowThemeInfo).length) {
        const url = '/theme/max/' + this.$store.state.roomId // voteが最大のQuestionsを取得する
        const response = await this.$axios.get(url, {})
        if (response.status === 200) {
          this.question = response.data.themes[0]
          this.$store.commit('setNowThemeInfo', this.question)
          this.$store.commit('setNowThemeId', this.question.id)
        }
      } else {
        this.question = this.$store.state.nowThemeInfo
      }
    }
  }
}
</script>
