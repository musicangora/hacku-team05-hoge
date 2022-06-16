<template>
  <div>
    <p>ここはお題を考えるページ</p>
    <!-- 以下実際はタイマーでページ遷移 -->
    <NuxtLink to="/:id/decideQuestion">時間が来ました</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
