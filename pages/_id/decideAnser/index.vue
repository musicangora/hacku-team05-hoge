<template>
  <div>
    <p>ここは,みんなで回答を選ぶページ</p>
    <!-- 以下実際はタイマーでページ遷移 -->
    <NuxtLink to="/:id/showFinalResult">時間が来ました</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
