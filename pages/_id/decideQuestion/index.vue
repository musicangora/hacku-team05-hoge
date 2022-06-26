<template>
  <div>
    <p>ここはお題を決めるページ</p>
    <!-- 以下実際はタイマーでページ遷移 -->
    <NuxtLink to="/:id/thinkAnser">時間が来ました</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
