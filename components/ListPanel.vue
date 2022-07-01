<template>
  <li
    class="flex flex-col justify-center bg-yellow-50 text-sm font-bold text-my-black h-11 w-80 text-left pl-8 m-4 mb-6 rounded-r-md rounded-l-full"
  >
    <p
      class="font-bold text-left text-xs text-ol-white-2 pb-2 transform -translate-y-4"
    >
      {{ userName }}
    </p>
    <div class="flex justify-between items-center transform -translate-y-3">
      <p class="text-base">{{ title }}</p>
      <button
        v-if="type == 'decide'"
        class="flex items-center"
        @click="
          changeGoodIcon()
          voteFunction(voteId, voteIndex)
        "
      >
        <!-- isClickでクリックアニメーションを入れたかった…… -->
        <div
          class="flex flex-col items-center inline-block mr-2 opacity-70 hover:opacity-100"
        >
          <img
            class="w-0.5 opacity-0"
            :class="{ 'opacity-100 animate-nice': isClick }"
            src="~assets/images/niiiiice.png"
          />
          <img
            class="w-4"
            :class="{ 'opacity-100 animate-wiggle': isClick }"
            :src="goodIconSrc"
          />
        </div>
        <p v-if="type == 'decide'" class="text-xs w-2 mr-4 pt-0.5">
          {{ voteNumber }}
        </p>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ListPanel',
  props: {
    userName: {
      type: String,
      required: false,
      default: 'ニックネーム#2434'
    },
    title: {
      type: String,
      required: false,
      default: '回答間に合わず(T_T)'
    },
    voteId: {
      type: String,
      required: false,
      default: ''
    },
    voteNumber: {
      type: Number,
      required: false,
      default: 0
    },
    type: {
      type: String,
      required: false,
      default: ''
    },
    voteIndex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      isClick: false,
      goodIconSrc: require('~/assets/images/good-line.png')
    }
  },
  methods: {
    changeGoodIcon() {
      this.isClick = true
      this.goodIconSrc = require('~/assets/images/good-fill.png')
    },
    voteFunction(id, index) {
      this.$emit('updateCount', id, index)
    }
  }
}
</script>
