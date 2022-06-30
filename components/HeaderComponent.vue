<template>
  <div class="h-20 mx-10 my-8 flex justify-between items-center text-center">
    <div class="flex flex-col justify-center items-center">
      <img class="w-20 mb-1" src="~assets/images/hacku-05.png" />
      <UserList />
    </div>
    <div>
      <NowQuestion />
    </div>
    <div class="w-20 h-20">
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
    }
  }
}
</script>

<style scoped></style>
