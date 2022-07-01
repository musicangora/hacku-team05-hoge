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
            <p class="text-xl text-ol-white-2 font-bold text-my-black">
              参加メンバー
            </p>
            <ul
              class="w-2/3 overflow-y-auto h-48 bg-my-yellow border-4 border-yellow-50 rounded-xl overflow-y-auto p-4 py-2"
            >
              <UserListPanel
                v-for="(member, key) in members"
                :key="key"
                :member-name="member.name"
              />

              <!-- TODO: V2でニックネームsend時にhost情報を付加してshow時にhost情報追加 -->
              <!-- <UserListPanel
                v-for="(member, key) in members"
                :key="key"
                :member-name="member.name"
                :type="'host'"
              /> -->

              <!-- <li
                v-for="(member, key) in members"
                :key="key"
                class="flex flex-col justify-center bg-yellow-50 text-sm font-bold text-my-black h-11 w-64 text-left pl-8 m-2 rounded-r-md rounded-l-full"
              >
                {{ c }}
                 <div v-if="host" class="inline-block text-xs pr-4 pt-0.5">
                    @ホスト
                  </div>
              </li> -->
            </ul>

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
                  :disabled="isEntered"
                  type="text"
                  class="w-64 h-11 p-3 text-lg text-gray-500 focus:text-my-black bg-yellow-50 focus:bg-yellow-100 border-4 border-my-black rounded-xl"
                  :placeholder="placeholder"
                />
              </div>
              <!--- ボタン -->
              <button
                class="w-32 h-11 pt-0.5 mt-4 bg-yellow-50 hover:opacity-80 border-4 border-my-black rounded-xl text-lg font-bold button-shadow active:button-shadow-none active:transform active:translate-y-1"
                :disabled="isEntered"
                @click.once="sendNickName"
              >
                決定
              </button>
            </div>
            <div v-if="isEntered && !host" class="flex items-center mb-4">
              <p>
                ルームに参加しました！ホストがゲームを開始するまでしばらくお待ちください
              </p>
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
                  class="w-72 h-15 text-left pl-2 pt-1 overflow-x-scroll text-sm text-my-black bg-yellow-50 border-2 border-my-black rounded-lg"
                >
                  {{ pageUrl }}
                </p>
              </div>
              <div class="relative">
                <!--- ボタン -->
                <button
                  class="w-28 h-8 pt-0.5 mt-4 bg-yellow-50 hover:opacity-80 border-2 border-my-black rounded-lg text-sm font-bold button-shadow active:button-shadow-none active:transform active:translate-y-0.5"
                  @click="copyLink"
                >
                  招待
                </button>
                <div
                  v-if="isSnackbarShowing"
                  class="absolute top-14 left-4"
                  role="alert"
                >
                  <p class="text-xs text-my-black font-bold text-ol-white-2">
                    リンクをコピー<br />しました！
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!--- 右半分 -->
          <div class="flex flex-col items-center text-center w-1/2 h-full">
            <p class="text-xl text-ol-white-2 font-bold text-red-500">遊び方</p>
            <div
              class="w-2/3 h-[354px] bg-my-yellow border-4 border-yellow-50 rounded-xl"
            >
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
              @click="gameStart"
            >
              <img
                class="w-4 inline-block pb-1 mr-1"
                src="~assets/images/start.png"
              />開始
            </button>
            <div class="mt-2">
              <p class="font-bold text-base text-red-500 text-ol-white-2">
                {{ canNotStart }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserListPanel from '../../components/UserListPanel.vue'
export default {
  name: 'IndexPage',
  components: { UserListPanel },
  data() {
    return {
      members: [],
      nickName: '',
      host: false,
      pageUrl: '',
      placeholder: 'ニックネーム#2435',
      waitInterval: null,
      memberInterval: null,
      canNotStart: '',
      gameStartFlag: false,
      isSnackbarShowing: false,
      isEntered: false
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
    this.getAllMember()
    this.showMember()
    if (this.host && this.$store.state.myNickName !== '') {
      this.isEntered = true
      this.nickName = this.$store.state.myNickName
    }
  },
  methods: {
    showSnackbar() {
      this.isSnackbarShowing = true
      setTimeout(() => {
        this.isSnackbarShowing = false
      }, 3000)
    },
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
        this.isEntered = true
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
      if (this.members.length >= 2 && this.$store.state.myNickName) {
        if (!this.gameStartFlag) {
          const url = '/room/active/' + this.$store.state.roomId
          const response = await this.$axios.post(url, '')
          if (response.status === 200) {
            this.$store.commit(
              'setStartTime',
              Date.parse(response.data.timestamp)
            )
            this.$router.push(
              '/' + this.$store.state.roomId + '/collectQuestions'
            )
            clearInterval(this.memberInterval)
            this.gameStartFlag = true
          }
        } else {
          console.log('何度も押さないでーーー')
        }
      } else {
        this.canNotStart =
          'ゲームを始めるには自分を含め少なくとも2名以上のニックネームの登録が必要です。'
      }
    },
    copyLink() {
      navigator.clipboard.writeText(this.pageUrl.toString())
      this.showSnackbar()
    }
  }
}
</script>
