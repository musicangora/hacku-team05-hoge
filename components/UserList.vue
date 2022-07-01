<template>
  <div class="relative">
    <button
      class="font-bold text-lg text-my-black text-ol-white-2"
      @click="toggleList"
    >
      参加者: {{ members.length }}人
    </button>
    <ul
      v-if="expanded"
      class="absolute left-1/2 transform -translate-x-1/2 bg-my-yellow border-2 border-yellow-50 rounded-md px-4 py-2"
    >
      <li
        v-for="(member, key) in members"
        :key="key"
        class="font-bold text-xs text-ol-white-2 m-0.5"
      >
        {{ member.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      members: [],
      expanded: false
    }
  },
  mounted() {
    this.getMember()
  },
  methods: {
    toggleList() {
      this.expanded = !this.expanded
    },
    async getMember() {
      if (this.$store.state.members.length === 0) {
        const url = '/room/guests/' + this.$store.state.roomId
        const response = await this.$axios.get(url)
        if (response.status === 200) {
          this.members = response.data[0].guests
          this.$store.commit('setMembers', this.members)
        }
      } else {
        this.members = this.$store.state.members
      }
    }
  }
}
</script>
