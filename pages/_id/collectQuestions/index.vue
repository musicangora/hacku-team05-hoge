<template>
  <div>
    <p>ここはお題を考えるページ</p>
    <div class="w-16 h-16">
      <Timer :time="Number(countDownTime)" :url="url" />
    </div>
    <!-- 以下実際はタイマーでページ遷移 -->
    <NuxtLink to="/:id/decideQuestion">
      時間が来ました
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      countDownTime: 30,
      url: '/:id/decideQuestion'
    }
  }
}
</script>
