
<template>
  <div>
    <p>ホスト用：Roomを作る</p>
    <!-- <div>
      TODO: v2でルーム名設定処理をおこなう
      <label for="roomName">ルーム名を入力</label><br>
      <input v-model="roomName" type="text" :placeholder="roomPlaceholder">
      <span>{{ errors.roomName }}</span>
    </div> -->
    <div>
      <button type="button" @click.once="createRoom">Roomを作る</button>
    </div>
    <div>
      <p>遊び方</p>
      <p>内容</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
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
    async createRoom () {
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
