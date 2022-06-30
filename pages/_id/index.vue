<template>
  <div>
    <div class="flex items-center justify-center bg-yellow-300 h-screen w-full">
      <!--- メインパネル -->
      <div
        class="flex flex-col w-[1024px] h-[660px] border-4 border-yellow-400 rounded-3xl"
      >
        <!--- ヘッダー -->
        <div class="h-20 m-4 flex justify-center items-center text-center">
          <img class="w-20" src="~assets/images/hacku-05.png" />
        </div>

        <!--- メインコンテンツ -->
        <div class="flex justify-center items-center">
          <!--- 左半分 -->
          <div
            class="flex flex-col justify-center items-center text-center w-1/2 h-full"
          >
            <div
              class="mt-4 w-2/3 h-2/3 bg-my-yellow border-4 border-yellow-50 rounded-xl"
            >
              <p
                class="text-xl text-ol-white-2 font-bold text-my-black transform -translate-y-4"
              >
                参加メンバー
              </p>
              <ul class="overflow-y-auto h-44 transform -translate-y-2">
                <!--TODO: V2でニックネームsend時にhost情報を付加してshow時にhost情報追加 -->
                <li
                  v-for="(member, key) in members"
                  :key="key"
                  class="flex flex-col justify-center bg-yellow-50 text-sm font-bold text-my-black h-11 w-64 text-left pl-8 m-2 ml-8 rounded-r-md rounded-l-full"
                >
                  {{ member.name }}
                  <!-- <div v-if="host" class="inline-block text-xs pr-4 pt-0.5">
                    @ホスト
                  </div> -->
                </li>
                <!-- <li
                class="flex items-center justify-between bg-yellow-50 text-sm font-bold text-my-black h-11 w-64 text-left pl-8 m-2 ml-8 rounded-r-md rounded-l-full"
              >
                わいはホストや！
              </li> -->
              </ul>
            </div>

            <!--- テキスト入力フィールド -->
            <div class="flex items-center m-4">
              <div class="mr-8">
                <div
                  class="pl-4 mb-0.5 text-left text-xs font-bold text-ol-white-2"
                >
                  ニックネームを入力
                </div>
                <input
                  v-model="nickName"
                  type="text"
                  class="w-64 h-11 p-3 text-lg text-gray-500 focus:text-my-black bg-yellow-50 focus:bg-yellow-100 border-4 border-my-black rounded-xl"
                  value="ニックネーム#2453"
                />
              </div>
              <!--- ボタン -->
              <button
                class="w-32 h-11 pt-0.5 mt-4 bg-yellow-50 hover:opacity-80 border-4 border-my-black rounded-xl text-lg font-bold button-shadow active:button-shadow-none active:transform active:translate-y-1"
                @click.once="sendNickName"
              >
                決定
              </button>
            </div>

            <!--- テキスト入力フィールド -->
            <div class="flex items-center">
              <div class="mr-4">
                <div
                  class="pl-2 mb-0.5 text-left text-xs font-bold text-ol-white-2"
                >
                  メンバー招待用リンク
                </div>
                <p
                  class="w-64 h-8 text-left pl-2 pt-1 overflow-x-auto text-sm text-my-black bg-yellow-50 border-2 border-my-black rounded-lg"
                >
                  {{ pageUrl }}
                </p>
              </div>
              <!--- ボタン -->
              <button
                class="w-36 h-8 pt-0.5 mt-4 bg-yellow-50 hover:opacity-80 border-2 border-my-black rounded-lg text-sm font-bold button-shadow active:button-shadow-none active:transform active:translate-y-0.5"
                @click="copyLink"
              >
                リンクをコピー
              </button>
            </div>
          </div>

          <!--- 右半分 -->
          <div class="flex flex-col items-center text-center w-1/2 h-full">
            <div
              class="mt-4 w-2/3 h-[354px] bg-my-yellow border-4 border-yellow-50 rounded-xl"
            >
              <p
                class="text-xl text-ol-white-2 font-bold text-red-500 transform -translate-y-4"
              >
                遊び方
              </p>
              <HowToPlay />
            </div>
          </div>
        </div>

        <!--- スタートボタン -->
        <div class="mt-8 flex justify-center items-center text-center">
          <div v-if="host">
            <!-- <div> -->
            <button
              class="w-36 h-11 pt-0.5 bg-yellow-50 hover:opacity-80 border-4 border-my-black rounded-xl text-lg font-bold button-shadow active:button-shadow-none active:transform active:translate-y-1"
              @click.once="gameStart"
            >
              <img
                class="w-4 inline-block pb-1 mr-1"
                src="~assets/images/start.png"
              />開始
            </button>
          </div>
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
      members: [],
      nickName: '',
      host: false,
      pageUrl: '',
      placeholder: 'ニックネーム',
      waitInterval: null,
      memberInterval: null
    }
  },
  mounted() {
    this.pageUrl = window.location.href
    this.$store.commit(
      'setRoomId',
      window.location.href.split('/').slice(-1)[0]
    )
    this.host = this.$store.state.host
    // this.roomCreate()
    // this.$store.commit('setHost')
    // this.host = this.$store.state.host
    this.showMember()
  },
  methods: {
    showMember() {
      const self = this
      this.memberInterval = setInterval(function () {
        self.getAllMember()
      }, 5000)
    },
    async getAllMember() {
      const url = '/room/guests/' + this.$store.state.roomId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        this.members = response.data[0].guests
      }
    },
    async sendNickName() {
      const url = '/room/guests/' + this.$store.state.roomId
      const response = await this.$axios.post(url, {
        name: String(this.nickName)
      })
      if (response.status === 200) {
        this.$store.commit('setNickName', String(this.nickName))
        if (!this.host) {
          this.wait()
        }
      }
    },
    wait() {
      const self = this
      this.waitInterval = setInterval(function () {
        self.getActiveState()
      }, 3000)
    },
    async getActiveState() {
      const url = '/room/active/' + this.$store.state.roomId
      const response = await this.$axios.get(url, '')
      if (response.status === 200) {
        if (response.data.isActive) {
          // this.$store.state.startTime = response.data.timestamp
          this.$store.commit(
            'setStartTime',
            Date.parse(response.data.timestamp)
          )
          this.$router.push(
            '/' + this.$store.state.roomId + '/collectQuestions'
          )
          clearInterval(this.waitInterval)
          clearInterval(this.memberInterval)
        }
      }
    },
    async gameStart() {
      const url = '/room/active/' + this.$store.state.roomId
      const response = await this.$axios.post(url, '')
      if (response.status === 200) {
        this.$store.commit('setStartTime', Date.parse(response.data.timestamp))
        this.$router.push('/' + this.$store.state.roomId + '/collectQuestions')
        clearInterval(this.memberInterval)
      }
    },
    copyLink() {
      navigator.clipboard.writeText(this.pageUrl.toString())
    }
  }
}
</script>
