<template>
  <div>
    <div v-if="type=='question'">
      <label for="question">お題</label>
      <input v-model="question" type="text" :placeholder="questionPlaceholder">
      <span>{{ errors.question }}</span>
    </div>
    <div v-if="type=='answer'">
      <label for="answer">あなたの回答</label>
      <input ref="send" v-model="answer" type="text" :placeholder="answerPlaceholder">
      <span>{{ errors.answer }}</span>
    </div>

    <div v-if="type=='question'" class="submit">
      <button type="button" :disabled="isDisabled" @click="sendText">決定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  question: '',
  answer: '回答間に合わず',
  data () {
    return {
      question: '',
      answer: '',
      errors: {},
      answerPlaceholder: 'あなたの回答',
      questionPlaceholder: '',
      sampleQuestions: [
        '〇〇年後にも残っていてほしい〇〇',
        '「懐かしい」と共感されそうな〇〇',
        'もし、〇〇なら〇〇？',
        '多分みんな〇〇、身近な豆知識',
        'ヤフーのいいところは？'
      ]
    }
  },
  computed: {
    isDisabled () {
      return Object.keys(this.errors).length > 0
    }
  },
  watch: {
    question (question) {
      if (!question || question.length < 30) {
        this.$delete(this.errors, 'question')
      } else {
        this.$set(this.errors, 'question', 'お題は30文字以内で入力してください。')
      }
    },
    answer (answer) {
      if (!answer || answer.length < 30) {
        this.$delete(this.errors, 'answer')
      } else {
        this.$set(this.errors, 'answer', '回答は30文字以内で入力してください。')
      }
    }

  },
  created () {
    this.questionPlaceholder = this.sampleQuestions[Math.floor(Math.random() * this.sampleQuestions.length)]
  },
  methods: {
    async sendText () {
      if (this.type === 'question' && this.question) {
        const url = '/theme/create/' + this.$store.state.roomId
        const response = await this.$axios.post(url, { theme: this.question, name: this.$store.state.myNickName })
        if (response.status === 200) {
          this.question = ''
        }
      }
      if (this.type === 'answer') {
        if (this.answer === '') {
          this.answer = '回答間に合わず(T_T)'
        }
        // 回答をpostする処理
        const url = '/answer/create/' + this.$store.state.nowThemeId
        const response = await this.$axios.post(url, { answer: this.answer, name: this.$store.state.myNickName })
        if (response.status === 200) {
          this.answer = ''
        }
      }
    },
    anserSend () {
      this.$refs.send.sendText()
    }
  }
}

</script>
