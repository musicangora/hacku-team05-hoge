<template>
  <div>
    <button @click="toggleList">現在のメンバー: {{ members.length }}人(クリックして一覧表示)</button>
    <ul v-if="expanded">
      <li v-for="(member, key) in members" :key="key">{{ member.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    return {
      members: [{ id: '123abc', name: 'foo' }, { id: 'bcd456', name: 'bar' }],
      expanded: false
    }
  },
  created () {
    this.getMember()
  },
  methods: {
    toggleList () {
      this.expanded = !this.expanded
    },
    async getMember () {
      if (this.$store.state.members === []) {
        const url = '/room/' + this.$store.state.roomId
        const response = await this.$axios.get(url)
        if (response.status === 200) {
          this.members = response.data.guests
          this.$store.commit('setMember', this.members)
        }
      } else {
        this.members = this.$store.state.members
      }
    }
  }
}

</script>
