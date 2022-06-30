<template>
  <li
    class="flex flex-col justify-center bg-yellow-50 text-sm font-bold text-my-black h-11 w-80 text-left pl-8 m-4 mb-6 rounded-r-md rounded-l-full"
  >
    <p
      class="font-bold text-left text-xs text-ol-white-2 pb-2 transform -translate-y-4"
    >
      {{ userName }}
    </p>
    <div class="flex justify-between">
      <p class="text-base transform -translate-y-3">{{ title }}</p>
      <span v-if="type == 'decide'">{{ voteNumber }}</span>
      <button
        v-if="type == 'decide'"
        @click="
          changeGoodIcon()
          voteFunction(voteId)
        "
      >
        <!-- isClickでクリックアニメーションを入れたかった…… -->
        <img
          class="w-5 inline-block mr-4 transform -translate-y-3 opacity-70 hover:opacity-100"
          :class="{ 'opacity-100': isClick }"
          :src="goodIconSrc"
        />
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
      default: 'いい感じのお題'
    },
    voteFunction: {
      type: Function,
      required: false,
      default: () => {}
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
    }
  }
}
</script>
