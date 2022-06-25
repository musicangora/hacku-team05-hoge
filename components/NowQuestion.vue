<template>
  <div>
    <h3>お題: {{ question.name }}</h3>
  </div>
</template>

<script>
export default {
  name: 'NowQuestion',
  data () {
    return {
      question: { id: '123abc', name: 'たけのこきのこ' }
    }
  },
  beforeMount () {
    this.getNowQuestion()
  },
  methods: {
    async getNowQuestion () {
      if (this.$store.state.nowThemeInfo === {}) {
        const url = '' // voteが最大のQuestionsを取得する
        const response = await this.$axios.get(url, {})
        if (response.status === 200) {
          this.question = response.data.theme
          this.$store.commit('setNowThemeInfo', this.question)
        }
      } else {
        this.question = this.$store.state.nowThemeInfo
      }
    }
  }
}

</script>
