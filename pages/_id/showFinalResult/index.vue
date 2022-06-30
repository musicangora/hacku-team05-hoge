<template>
  <div class="flex items-center justify-center bg-yellow-300 h-screen w-full">
    <!--- メインパネル -->
    <div
      class="flex flex-col w-[1024px] h-[660px] border-4 border-yellow-400 rounded-3xl"
    >
      <!--- ヘッダー -->
      <div class="h-24 m-4 flex justify-center items-center text-center mb-0">
        <img class="w-24" src="~assets/images/hacku-05.png" />
      </div>
      <!-- 以下実際はタイマーでページ遷移 -->
      <!-- <NuxtLink to="/:id/decideQuestion">もう一度しましょう</NuxtLink> -->

      <!--- メインコンテンツ -->
      <div class="flex h-[480px]">
        <!--- 左半分 -->
        <div class="flex items-center flex-col text-center h-full w-1/3 ml-16">
          <p class="text-xl text-ol-white-2 font-bold text-my-black">
            参加メンバー
          </p>
          <ul
            class="w-full overflow-y-auto h-full bg-my-yellow border-4 border-yellow-50 rounded-xl overflow-y-auto p-4 py-2"
          >
            <UserListPanel
              v-for="(member, key) in members"
              :key="key"
              :member-name="member.name"
            />
          </ul>
        </div>

        <!--- 右半分 -->
        <div class="flex flex-col text-center w-2/3 ml-8 mr-16">
          <div class="flex flex-col items-center">
            <p class="font-bold text-my-black text-xl text-ol-white-2 mb-0.5">
              お題
            </p>
            <div
              class="flex items-center justify-center w-full h-32 bg-my-yellow border-4 border-yellow-50 rounded-xl overflow-y-auto p-4 py-8 mb-8"
            >
              <NowQuestion />
            </div>

            <p class="font-bold text-red-500 text-xl text-ol-white-2 mb-0.5">
              最も共感を集めた回答
            </p>
            <div
              class="flex flex-col items-center justify-center w-full h-48 bg-my-yellow border-4 border-yellow-50 rounded-xl overflow-y-auto px-8 py-8 mb-6"
            >
              <p class="font-bold text-4xl text-yellow-50 text-ol-black-2 pt-4">
                {{ answer.title }}
                <!-- めちゃめちゃめちゃめちゃいい感じの回答 -->
              </p>
              <p class="font-bold text-my-black text-lg text-ol-white-2 mt-2">
                <!-- ほげほげさん -->
                {{ answer.createdUserName }}
              </p>
            </div>
            <div class="flex justify-evenly w-full">
              <button
                class="w-52 h-11 pt-0.5 bg-yellow-50 hover:opacity-80 border-4 border-my-black rounded-xl text-lg font-bold button-shadow active:button-shadow-none active:transform active:translate-y-1"
              >
                結果を共有
              </button>
              <div v-if="host">
                <button
                  class="w-52 h-11 pt-0.5 bg-yellow-50 hover:opacity-80 border-4 border-my-black rounded-xl text-lg font-bold button-shadow active:button-shadow-none active:transform active:translate-y-1"
                  @click.once="gameRestart"
                >
                  もう一度遊ぶ！
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NowQuestion from '../../../components/NowQuestion.vue'
import UserListPanel from '../../../components/UserListPanel.vue'
export default {
  name: 'IndexPage',
  components: { UserListPanel, NowQuestion },
  data() {
    return {
      members: [],
      answer: {},
      host: false,
      intervalId: null
    }
  },
  mounted() {
    this.getAllMember()
    this.showMaxAnser()
    this.host = this.$store.state.host
    const self = this
    setInterval(function () { self.checkNextGame() }, 5000)
  },
  methods: {
    getAllMember() {
      this.members = this.$store.state.members
    },
    showMaxAnser() {
      const self = this
      this.intervalId = setInterval(function () {
        self.getMaxAnswer()
      }, 1000)
    },
    async getMaxAnswer() {
      const url = '/answer/max/' + this.$store.state.nowThemeId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        if (
          response.data.linkedAnser.length === this.$store.state.members.length
        ) {
          this.answer = response.data.linkedAnser[0]
          clearInterval(this.intervalId)
        } else {
          this.answer = response.data[0]
        }
      }
    },
    async gameRestart () {
      const url = '/room/create'
      const response = await this.$axios.post(url)
      if (response.status === 200) {
        this.$store.commit('setRoomId', response.data.room_id)
        this.$store.commit('setHost')
        await this.$axios.post('/room/guests/' + response.data.room_id, {
          name: String(this.$store.state.myNickName)
        })
        this.$router.push('/' + this.$store.state.roomId)
      }
    },
    checkNextGame () {
      // this.$router.push('/' + this.$store.state.roomId + '/collectQuestions')
    }
  }
}
</script>
