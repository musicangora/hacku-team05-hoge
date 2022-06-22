<template>
  <div>
    <div v-if="type=='question'">
      <label for="question">お題</label>
      <input v-model="question" type="text" :placeholder="questionPlaceholder">
      <span>{{ errors.question }}</span>
    </div>
    <div v-if="type=='answer'">
      <label for="answer">あなたの回答</label>
      <input v-model="answer" type="text">
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
  answer: '',
  data () {
    return {
      question: '',
      answer: '',
      errors: {},
      questionPlaceholder: '',
      sampleQuestions: [
        '「あ」で始まる最高の映画は？',
        '「い」で始まる小学生時代の流行は？',
        '「う」で始まる好きな料理は？'
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
    sendText () {
      if (this.type === 'question' && this.question) {
        // お題をpostする処理
        this.question = ''
        this.$emit('postComplete')
      }
      if (this.type === 'answer' && this.answer) {
        // 回答をpostする処理
      }
    }
  }
}

</script>
