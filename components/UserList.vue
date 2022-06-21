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
    // メンバーを取得してmembersに入れる処理
  },
  methods: {
    toggleList () {
      this.expanded = !this.expanded
    }
  }
}

</script>
