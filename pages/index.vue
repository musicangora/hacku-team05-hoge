
<template>
  <div>
    <p>ホスト用：Roomを作る</p>
    <NuxtLink to="/:id">ルームを作る</NuxtLink>
    <div>
      <p>Niiiiiiice</p>
      <p>画像</p>
    </div>
    <div>
      <label for="roomName">ルーム名を入力</label><br>
      <input v-model="roomName" type="text" :placeholder="roomPlaceholder">
      <span>{{ errors.roomName }}</span>
    </div>
    <div>
      <button type="button" :disabled="isDisabled" @click="sendText">招待する</button>
      <p>{{url}}</p>
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
  roomName: '',
  data () {
    return {
      roomName: '',
      url: '',
      errors: {},
      roomPlaceholder: '',
      sampleRooms: [
        'ルーム名#3245'
      ]
    }
  },
  computed: {
    isDisabled () {
      return Object.keys(this.errors).length > 0
    }
  },
  watch: {
    roomName (roomName) {
      if (!roomName || roomName.length < 30) {
        this.$delete(this.errors, 'roomName')
      } else {
        this.$set(this.errors, 'roomName', 'ルーム名は30文字以内で入力してください。')
      }
    }
  },
  created () {
    this.roomPlaceholder = this.sampleRooms[Math.floor(Math.random() * this.sampleRooms.length)]
  },
  methods: {
    sendText () {
      if (this.roomName) {
        // お題をpostする処理
        this.url = '招待URL表示'
        this.$emit('postComplete')
        // バックエンドにリクエスト
        // Room_ID,host をvuexに保存
        this.res = '2312'
        this.$router.push(this.res)
      }
    }
  }
}

</script>
