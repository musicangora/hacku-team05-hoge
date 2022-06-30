<template>
  <div class="h-20 mx-10 my-8 flex justify-between items-center text-center">
    <div class="flex flex-col justify-center items-center">
      <img class="w-20 mb-1" src="~assets/images/hacku-05.png" />
      <UserList />
    </div>
    <div v-if="type == 'answer'">
      <NowQuestion />
    </div>

    <div v-if="type == 'question'">
      <h2 class="font-bold text-3xl text-red-500 text-ol-white-2 mb-1">
        いいと思ったお題にいいね<img
          class="h-10 inline-block pb-2 ml-2 mr-1"
          src="~assets/images/good_icon.png"
        />しよう！
      </h2>
    </div>

    <div v-if="type == 'collect'">
      <h2 class="font-bold text-3xl text-red-500 text-ol-white-2 mb-1">
        議論のお題を考えよう！
      </h2>
    </div>

    <div v-if="type == 'think'">
      <h2 class="font-bold text-2xl text-red-500 text-ol-white-2 mb-1">
        回答を考えよう
      </h2>
    </div>
    <div v-if="type == 'think'" class="w-20 h-20">
      <Timer
        :time="time"
        :url="url"
        :is-answer="isAnswer"
        :post-answer="postAnswer"
      />
    </div>
    <div v-else class="w-20 h-20">
      <Timer :time="time" :url="url" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    time: {
      type: Number,
      required: false,
      default: 300
    },
    url: {
      type: String,
      required: false,
      default: '/'
    },
    isAnswer: {
      type: Boolean,
      required: false,
      default: false
    },
    postAnswer: {
      type: Function,
      required: false,
      default: () => {}
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped></style>
