<template>
  <div>
    <p>ここは,最終結果のページ</p>
    <!-- 以下実際はタイマーでページ遷移 -->
    <NuxtLink to="/:id/decideQuestion">もう一度しましょう</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
