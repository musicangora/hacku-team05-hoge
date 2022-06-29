<template>
  <div class="flex items-center justify-center bg-yellow-300 h-screen w-full">
    <!--- メインパネル -->
    <div
      class="flex flex-col w-[1024px] h-[660px] border-4 border-yellow-400 rounded-3xl"
    >
      <!-- 以下実際はタイマーでページ遷移 -->
      <!-- <NuxtLink to="/:id/showFinalResult">時間が来ました</NuxtLink> -->
      <!--- ヘッダー -->
      <div
        class="h-20 mx-10 my-8 flex justify-between items-center text-center"
      >
        <div class="flex flex-col justify-center items-center">
          <img class="w-20 mb-1" src="~assets/images/hacku-05.png" />
          <UserList />
        </div>
        <div>
          <NowQuestion />
        </div>
        <div class="w-20 h-20">
          <Timer :time="Number(countDownTime)" :url="url" />
        </div>
      </div>

      <!-- お題パネル -->
      <div class="flex flex-col items-center h-full">
        <!--- お題パネル -->
        <p
          class="font-bold text-left text-sm text-ol-white-2 mb-1 transform -translate-x-80"
        >
          みんなの回答
        </p>
        <ul
          class="flex flex-wrap items-center w-3/4 h-2/3 bg-my-yellow border-4 border-yellow-50 rounded-xl overflow-y-scroll p-4 py-8"
        >
          <li
            v-for="(anser, key) in ansers"
            :key="key"
            class="flex flex-col justify-center bg-yellow-50 text-sm font-bold text-my-black h-11 w-80 text-left pl-8 m-4 mb-6 rounded-r-md rounded-l-full"
          >
            <p
              class="font-bold text-left text-xs text-ol-white-2 pb-2 transform -translate-y-4"
            >
              {{ anser.createdUserName }}
            </p>
            <p class="text-base transform -translate-y-3">
              {{ anser.title }}
            </p>
            <button @click="voteAnser(anser.id)">
              <img
                class="w-4 inline-block pb-1 mr-1"
                src="~assets/images/start.png"
              />
            </button>
          </li>
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
            自分の回答のアピールをして共感を集めよう！みんなの回答に共感したら投票しよう！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      countDownTime: 90,
      url: '',
      ansers: [],
      voteCount: 0,
      maxVoteCount: 10,
      intervalId: null,
      goodIconSrc: '/_nuxt/assets/images/good-line.png'
    }
  },
  created() {
    this.url = '/' + this.$store.state.roomId + '/showFinalResult'
  },
  mounted() {
    this.showAnser()
  },
  methods: {
    showAnser() {
      const self = this
      this.intervalId = setInterval(function () {
        self.getAnser()
      }, 1000)
    },
    async getAnser() {
      const url = '/answer/read/' + this.$store.state.nowThemeId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        if (
          response.data[0].linkedAnser.length ===
          this.$store.state.members.length
        ) {
          this.ansers = response.data[0].linkedAnser
          clearInterval(this.intervalId)
        } else {
          this.ansers = response.data
        }
      }
    },
    async voteAnser(anserId) {
      if (this.maxVoteCount > this.voteCount) {
        const url = '/answer/vote/' + anserId
        const response = await this.$axios.post(url, '')
        if (response.status === 200) {
          this.voteCount += 1
        }
      }
    },
    changeGoodIcon() {
      this.goodIconSrc = '/_nuxt/assets/images/good-fill.png'
    }
  }
}
</script>
