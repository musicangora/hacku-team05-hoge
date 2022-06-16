<template>
  <div>
    <p>ここは,自分の回答を入力するページ</p>
    <!-- 以下実際はタイマーでページ遷移 -->
    <NuxtLink to="/:id/decideAnser">時間が来ました</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
