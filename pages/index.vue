<template>
  <div class="flex items-center justify-center bg-yellow-300 h-screen w-full">
    <!--- メインパネル -->
    <div
      class="mx-8 md:mx-0 flex flex-col w-[1024px] h-[660px] border-4 border-yellow-400 rounded-3xl"
    >
      <!--- ヘッダー -->
      <div class="h-28 m-4 flex justify-center items-center text-center">
        <div class="relative w-28 h-28">
          <img
            class="absolute left-1/2 top-1.5 transform -translate-x-1/2 w-[5.8rem] animate-topbg"
            src="~assets/images/top_logo_bg.png"
          />

          <img
            class="absolute left-[18px] w-[4.3rem] animate-toplogo"
            src="~assets/images/top_logo.png"
          />

          <img
            class="absolute top-16 w-28 animate-toptext"
            src="~assets/images/top_logo_text.png"
          />
          <!-- <img class="w-28" src="~assets/images/hacku-05.png" /> -->
        </div>
      </div>

      <!-- <div>
      TODO: v2でルーム名設定処理をおこなう
      <label for="roomName">ルーム名を入力</label><br>
      <input v-model="roomName" type="text" :placeholder="roomPlaceholder">
      <span>{{ errors.roomName }}</span>
    </div> -->
      <!--- メインコンテンツ -->
      <div class="flex justify-center items-center">
        <!--- 左半分 -->
        <div
          class="flex flex-col justify-center items-center text-center md:w-1/2"
        >
          <div class="w-56 h-56">
            <h2 class="font-bold text-2xl text-my-black mb-0.5 mt-4">
              共感を集めて<br />1つの答えを<br />みんなで出すゲーム
            </h2>
            <img
              class="h-16 inline-block m-2"
              src="~assets/images/good_icon.png"
            />
          </div>
          <!--- テキスト入力フィールド -->
          <div>
            <div
              class="pl-4 mb-0.5 text-left text-xs font-bold text-ol-white-2"
            >
              ルーム名を入力
            </div>
            <input
              type="text"
              class="w-80 h-11 p-3 text-lg text-gray-400 focus:text-gray-700 bg-yellow-50 focus:bg-yellow-100 border-4 border-my-black rounded-xl"
              :placeholder="placeholder"
            />
          </div>
          <!--- ボタン -->
          <button
            class="w-72 h-11 pt-0.5 mt-10 bg-yellow-50 hover:opacity-80 border-4 border-my-black rounded-xl text-lg font-bold button-shadow active:button-shadow-none active:transform active:translate-y-1"
            type="button"
            @click.once="createRoom"
          >
            メンバーを招待
          </button>
        </div>

        <!--- 右半分 -->
        <div
          class="hidden md:flex flex-col items-center text-center w-1/2 h-full"
        >
          <p class="text-xl text-ol-white-2 font-bold text-red-500">遊び方</p>
          <div
            class="w-2/3 h-[354px] bg-my-yellow border-4 border-yellow-50 rounded-xl"
          >
            <HowToPlay />
            <!-- <p>内容</p> -->
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
      placeholder: 'ルーム名#3246'
    }
  },
  methods: {
    async createRoom() {
      const url = '/room/create'
      const response = await this.$axios.post(url)
      if (response.status === 200) {
        this.$store.commit('setMembers', [])
        this.$store.commit('setNickName', '')
        this.$store.commit('setRoomId', response.data.room_id)
        this.$store.commit('setHost')
        this.$router.push('/' + this.$store.state.roomId)
      }
    }
  }
}
</script>
