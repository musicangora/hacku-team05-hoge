<template>
  <!--TODO: V2でニックネームsend時にhost情報を付加してshow時にhost情報追加 -->
  <li
    class="flex items-center justify-between bg-yellow-50 text-sm font-bold text-my-black h-11 w-64 text-left pl-8 m-2 rounded-r-md rounded-l-full"
  >
    {{ memberName }}
    <div v-if="type == 'host'" class="inline-block font-semibold text-xs pr-4">
      @ホスト
    </div>
  </li>
</template>

<script>
export default {
  name: 'UserListPanel',
  props: {
    memberName: {
      type: String,
      required: false,
      default: 'ニックネーム#2434'
    },
    type: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
