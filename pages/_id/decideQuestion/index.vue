<template>
  <div class="flex items-center justify-center bg-yellow-300 h-screen w-full">
    <!--- メインパネル -->
    <div
      class="flex flex-col w-[1024px] h-[660px] border-4 border-yellow-400 rounded-3xl"
    >
      <!-- 以下実際はタイマーでページ遷移 -->
      <!-- <NuxtLink to="/:id/thinkAnser">時間が来ました</NuxtLink> -->
      <!--- ヘッダー -->
      <HeaderComponent
        :type="'question'"
        :time="Number(countDownTime)"
        :url="url"
      />
      <!-- お題パネル -->
      <div class="flex flex-col items-center h-full">
        <!--- お題パネル -->
        <div class="w-3/4">
          <p class="font-bold text-left text-sm text-ol-white-2 mb-1 pl-4">
            みんなの考えたお題
          </p>
        </div>
        <ul
          class="flex flex-wrap items-center w-3/4 h-2/3 bg-my-yellow border-4 border-yellow-50 rounded-xl overflow-y-auto p-4 py-8"
        >
          <!-- <li
            v-for="(question, key) in questions"
            :key="key"
            class="flex flex-col justify-center bg-yellow-50 text-sm font-bold text-my-black h-11 w-80 text-left pl-8 m-4 mb-6 rounded-r-md rounded-l-full"
          >
            <p
              class="font-bold text-left text-xs text-ol-white-2 pb-2 transform -translate-y-4"
            >
              {{ question.createdUserName }}
            </p>
            <div class="flex justify-between">
              <p class="text-base transform -translate-y-3">
                {{ question.title }}
              </p>
              <button
                @click="
                  voteQuestion(question.id)
                  changeGoodIcon()
                "
              >
                <img
                  class="w-4 inline-block mr-4 transform -translate-y-3"
                  :class="{ 'animate-bounce': isClick }"
                  :src="goodIconSrc"
                />
              </button>
            </div>
          </li> -->
          <ListPanel
            v-for="(question, key) in questions"
            :key="key"
            :type="'decide'"
            :user-name="question.createdUserName"
            :title="question.title"
            :vote-function="voteQuestion"
            :vote-id="question.id"
          />
        </ul>

        <div class="flex flex-col items-center justify-center mt-4">
          <div v-if="maxVoteCount - voteCount > 0">
            <p class="font-bold text-lg text-red-500 text-ol-white-2 mb-1">
              残り投票回数: {{ maxVoteCount - voteCount }}回
            </p>
          </div>
          <div v-else>
            <p>投票可能回数が上限に達しました</p>
          </div>
          <p class="font-bold text-xs text-my-black text-ol-white-2">
            みんなで話し合いながら Niiiiice! なお題に投票しよう！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListPanel from '../../../components/ListPanel.vue'
export default {
  name: 'IndexPage',
  components: { ListPanel },
  data() {
    return {
      countDownTime: 30,
      url: '',
      questions: [],
      voteCount: 0,
      maxVoteCount: 10
      // isClick: false,
      // goodIconSrc: require('~/assets/images/good-line.png')
    }
  },
  created() {
    this.url = '/' + this.$store.state.roomId + '/thinkAnser'
  },
  mounted() {
    this.showQuestions()
  },
  methods: {
    async showQuestions() {
      const url = '/theme/read/' + this.$store.state.roomId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        this.questions = response.data.themes
      }
    },
    async voteQuestion (questionId, index) {
      if (this.maxVoteCount > this.voteCount) {
        this.questions[index].numberOfVotes += 1
        const url = '/theme/vote/' + questionId
        const response = await this.$axios.post(url, '')
        if (response.status === 200) {
          this.voteCount += 1
        }
      }
    }
    // changeGoodIcon() {
    //   this.isClick = true
    //   this.goodIconSrc = require('~/assets/images/good-fill.png')
    // }
  }
}
</script>
