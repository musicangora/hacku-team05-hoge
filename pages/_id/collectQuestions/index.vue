<template>
  <div>
    <p>ここはお題を考えるページ</p>
    <!-- 以下実際はタイマーでページ遷移 -->
    <NuxtLink to="/:id/decideQuestion">
      時間が来ました
    </NuxtLink>
    <div class="w-20 h-20">
      <Timer :time="Number(countDownTime)" :url="url" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      countDownTime: 20,
      url: '/:id/decideQuestion'
    }
  }
}
</script>
