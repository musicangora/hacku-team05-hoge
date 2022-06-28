<template>
  <div class="flex items-center justify-center bg-yellow-300 h-screen w-full">
    <!--- メインパネル -->
    <div
      class="flex flex-col w-[1024px] h-4/6 border-4 border-yellow-400 rounded-3xl"
    >
      <!--- ヘッダー -->
      <div class="h-28 m-4 flex justify-center items-center text-center">
        <img class="w-28" src="~assets/images/hacku-05.png">
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
          class="flex flex-col justify-center items-center text-center w-1/2"
        >
          <div class="w-56 h-56">なんかいい感じのロゴ</div>
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
              value="ルーム名#3246"
            >
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
        <div class="flex flex-col items-center text-center w-1/2 h-full">
          <div
            class="mt-4 w-2/3 h-full bg-my-yellow border-4 border-yellow-50 rounded-xl"
          >
            <p
              class="text-xl text-ol-white-2 font-bold text-red-500 transform -translate-y-4"
            >
              遊び方
            </p>
            <p>内容</p>
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
      // roomName: '',
      // url: '',
      // errors: {},
      // roomPlaceholder: '',
      // sampleRooms: [
      //   'ルーム名#3245'
      // ]
    }
  },
  // computed: {
  //   isDisabled () {
  //     return Object.keys(this.errors).length > 0
  //   }
  // },
  // watch: {
  //   roomName (roomName) {
  //     if (!roomName || roomName.length < 30) {
  //       this.$delete(this.errors, 'roomName')
  //     } else {
  //       this.$set(this.errors, 'roomName', 'ルーム名は30文字以内で入力してください。')
  //     }
  //   }
  // },
  // created () {
  //   this.roomPlaceholder = this.sampleRooms[Math.floor(Math.random() * this.sampleRooms.length)]
  // },
  methods: {
    async createRoom() {
      const url = '/room/create'
      const response = await this.$axios.post(url)
      if (response.status === 200) {
        this.$store.commit('setRoomId', response.data.room_id)
        this.$store.commit('setHost')
        this.$router.push(this.$store.state.roomId)
      }
    }
  }
}
</script>
