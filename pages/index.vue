
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
      <HowToPlay />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
    }
  },
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
