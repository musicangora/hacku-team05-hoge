<template>
  <div class="flex flex-col items-center text-center">
    <svg viewBox="-1 -1 2 2" style="transform: rotate(-90deg)">
      <circle cx="0" cy="0" r="1" fill="#fcd34d" />
      <path :d="shape" :fill="color" />
    </svg>
    <p
      class="font-bold text-my-black text-2xl text-ol-white-2 transform -translate-y-14"
    >
      {{ sec }}
    </p>
    <!-- <button @click="start">
      スタート
    </button> -->
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
    }
  },
  data() {
    return {
      sec: 60,
      nextpage: '/',
      timer: null,
      // 円形周り
      percent: 0,
      color: '#fef3c7',
      currentPercent: 1, // 0 < currentPercent < 1
      // 円の全体を塗りつぶしている初期値
      shape: 'M 1 0 A 1 1 0 1 1 1 -1.133107779529596e-15 L 0 0'
    }
  },
  async mounted() {
    clearInterval(this.timer)
    const offset = await this.$store.dispatch('fetchTimerOffset')
    this.sec = this.time
    this.nextpage = this.url
    this.sec = this.sec - offset
    this.percent = 1 / this.time // １秒毎の円グラフの変化量
    this.currentPercent = this.sec / this.time
    this.start()
  },
  methods: {
    start() {
      const self = this
      this.shape = this.calc()
      this.timer = setInterval(function () {
        self.countDown()
      }, 1000)
    },
    countDown() {
      if (this.sec > 0) {
        this.sec--
        this.currentPercent -= this.percent
        this.shape = this.calc()
        if (this.sec < this.time / 2) {
          this.color = '#fffbeb'
        }
        if (this.sec < this.time / 4) {
          this.color = '#F6313D'
        }
      } else {
        this.changePage()
      }
    },
    async changePage() {
      this.$store.dispatch('resetTimerTime')
      clearInterval(this.timer)
      if (this.isAnswer) {
        await this.postAnswer()
        clearInterval(this.timer)
        this.$router.push(this.nextpage)
        this.reset_data()
      } else {
        clearInterval(this.timer)
        this.$router.push(this.nextpage)
        this.reset_data()
      }
    },
    // 円形描画
    getPieVal(per) {
      const x = Math.cos(2 * Math.PI * per)
      const y = Math.sin(2 * Math.PI * per)
      return [x, y]
    },
    calc() {
      const [endX, endY] = this.getPieVal(this.currentPercent)
      const largeArcFlag = this.currentPercent > 0.5 ? 1 : 0
      const pathData = [
        'M 1 0',
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        'L 0 0'
      ].join(' ')
      return pathData
    },
    reset_data() {
      this.sec = 60
      this.nextpage = '/'
      // 円形周り
      this.percent = 0
      this.color = '#FEF4D6'
      this.currentPercent = 1
      this.shape = 'M 1 0 A 1 1 0 1 1 1 -1.133107779529596e-15 L 0 0'
    }
  }
}
</script>
