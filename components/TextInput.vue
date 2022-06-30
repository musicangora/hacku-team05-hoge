<template>
  <div
    class="w-full m-4 my-2"
    :class="{ 'flex justify-center items-center': type == 'question' }"
  >
    <div v-if="type == 'question'" class="mr-8">
      <div
        class="pl-4 text-left text-xs font-bold text-ol-white-2"
        for="question"
      >
        お題
        <span class="text-sm text-red-600 pl-4 font-bold text-ol-white-2">
          {{ errors.question }}
        </span>
      </div>
      <input
        v-model="question"
        type="text"
        class="w-96 h-11 p-3 text-lg text-gray-500 focus:text-my-black bg-yellow-50 focus:bg-yellow-100 border-4 border-my-black rounded-xl"
        :placeholder="questionPlaceholder"
      />
    </div>

    <div v-if="type == 'answer'" class="flex flex-col items-center">
      <label
        class="mb-1 text-xl font-bold text-red-500 text-ol-white-2"
        for="answer"
        >あなたの回答を入力</label
      >
      <input
        ref="send"
        v-model="answer"
        type="text"
        class="w-1/2 h-11 p-3 text-lg text-gray-500 focus:text-my-black bg-yellow-50 focus:bg-yellow-100 border-4 border-my-black rounded-xl"
        :placeholder="answerPlaceholder"
      />
      <span class="text-sm text-red-600 mt-1 font-bold text-ol-white-2">
        {{ errors.answer }}
      </span>
    </div>

    <div v-if="type == 'question'" class="inline-block">
      <button
        class="w-32 h-11 pt-0.5 mt-4 bg-yellow-50 hover:opacity-80 border-4 border-my-black rounded-xl text-lg font-bold button-shadow active:button-shadow-none active:transform active:translate-y-1"
        type="button"
        :disabled="isDisabled"
        @click="sendText"
      >
        追加
      </button>
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
  data() {
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
    isDisabled() {
      return Object.keys(this.errors).length > 0
    }
  },
  watch: {
    question(question) {
      if (!question || question.length < 30) {
        this.$delete(this.errors, 'question')
      } else {
        this.$set(
          this.errors,
          'question',
          'お題は30文字以内で入力してください。'
        )
      }
    },
    answer(answer) {
      if (!answer || answer.length < 30) {
        this.$delete(this.errors, 'answer')
      } else {
        this.$set(this.errors, 'answer', '回答は30文字以内で入力してください。')
      }
    }
  },
  created() {
    this.questionPlaceholder =
      this.sampleQuestions[
        Math.floor(Math.random() * this.sampleQuestions.length)
      ]
  },
  methods: {
    async sendText() {
      if (this.type === 'question' && this.question) {
        const url = '/theme/create/' + this.$store.state.roomId
        const response = await this.$axios.post(url, {
          theme: this.question,
          name: this.$store.state.myNickName
        })
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
        const response = await this.$axios.post(url, {
          answer: this.answer,
          name: this.$store.state.myNickName
        })
        if (response.status === 200) {
          this.answer = ''
        }
      }
    },
    anserSend() {
      this.$refs.send.sendText()
    }
  }
}
</script>
