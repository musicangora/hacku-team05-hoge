<template>
  <div>
    <p>ここは,みんなで回答を選ぶページ</p>
    <!-- 以下実際はタイマーでページ遷移 -->
    <!-- <NuxtLink to="/:id/showFinalResult">時間が来ました</NuxtLink> -->
    <div class="w-20 h-50">
      <Timer :time="Number(countDownTime)" :url="url" />
    </div>
    <UserList />
    <NowQuestion />
    <p>自分の回答のアピールをして共感を集めよう！みんなの回答に共感したら投票しよう！</p>
    <p>みんなの回答</p>
    <ul>
      <li v-for="(anser,key) in ansers" :key="key">{{ anser.createdUserName }} {{ anser.title }}
        <button @click="voteAnser(anser.id)">good</button>
      </li>
    </ul>

    <div v-if=" maxVoteCount - voteCount > 0">
      <p>残り投票回数: {{ maxVoteCount - voteCount }}回</p>
    </div>
    <div v-else>
      <p>投票可能回数が上限に達しました</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      countDownTime: 90,
      url: '',
      ansers: [],
      voteCount: 0,
      maxVoteCount: 10,
      intervalId: null
    }
  },
  created () {
    this.url = '/' + this.$store.state.roomId + '/showFinalResult'
  },
  mounted () {
    this.showAnser()
  },
  methods: {
    showAnser () {
      const self = this
      this.intervalId = setInterval(function () { self.getAnser() }, 1000)
    },
    async getAnser () {
      const url = '/answer/read/' + this.$store.state.nowThemeId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        if (response.data[0].linkedAnser.length === this.$store.state.members.length) {
          this.ansers = response.data[0].linkedAnser
          clearInterval(this.intervalId)
        } else {
          this.ansers = response.data
        }
      }
    },
    async voteAnser (anserId) {
      if (this.maxVoteCount > this.voteCount) {
        const url = '/answer/vote/' + anserId
        const response = await this.$axios.post(url, '')
        if (response.status === 200) {
          this.voteCount += 1
        }
      }
    }
  }
}
</script>
