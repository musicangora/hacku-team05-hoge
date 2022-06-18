<template>
  <div>
    <p>{{ showTime }}</p>
    <button @click="start">
      スタート
    </button>
  </div>
</template>

<script>
export default {
  name: 'Timer',
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
  },
  data () {
    return {
      sec: 1,
      nextpage: '/',
      timer: null
    }
  },
  computed: {
    showTime () {
      return this.sec
    }
  },
  mounted () {
    this.sec = this.time
    this.nextpage = this.url
  },
  methods: {
    start () {
      const self = this
      this.timer = setInterval(function () { self.countDown() }, 1000)
    },
    countDown () {
      if (this.sec > 0) {
        this.sec--
      } else {
        this.changePage()
      }
    },
    changePage () {
      clearInterval(this.timer)
      // console.log(this.nextpage)
      this.$router.push(this.nextpage)
    }
  }
}
</script>
