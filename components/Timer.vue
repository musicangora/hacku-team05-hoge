<template>
  <div>
    <svg viewBox="-1 -1 2 2" style="transform: rotate(-90deg)">
      <circle cx="0" cy="0" r="1" fill="#eeeeee" />
      <path :d="shape" :fill="color" />
    </svg>
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
      timer: null,
      // 円形周り
      percent: 0,
      color: '#0ea5e9',
      currentPercent: 1, // 0 < currentPercent < 1
      // 円の全体を塗りつぶしている初期値
      shape: 'M 1 0 A 1 1 0 1 1 1 -1.133107779529596e-15 L 0 0'
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
    this.percent = 1 / this.sec // １秒毎の円グラフの変化量
  },
  methods: {
    start () {
      const self = this
      this.timer = setInterval(function () { self.countDown() }, 1000)
    },
    countDown () {
      if (this.sec > 0) {
        this.sec--
        this.currentPercent -= this.percent
        this.shape = this.calc()
        if (this.sec < this.time / 2) {
          this.color = '#f97316'
        }
        if (this.sec < this.time / 4) {
          this.color = '#dc2626'
        }
      } else {
        this.changePage()
      }
    },
    changePage () {
      clearInterval(this.timer)
      // console.log(this.nextpage)
      this.$router.push(this.nextpage)
      this.reset_data()
    },
    // 円形描画
    getPieVal (per) {
      const x = Math.cos(2 * Math.PI * per)
      const y = Math.sin(2 * Math.PI * per)
      return [x, y]
    },
    calc () {
      const [endX, endY] = this.getPieVal(this.currentPercent)
      const largeArcFlag = this.currentPercent > 0.5 ? 1 : 0
      const pathData = [
        'M 1 0',
          `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          'L 0 0'
      ].join(' ')
      return pathData
    },
    reset_data () {
      this.sec = 1
      this.nextpage = '/'
      this.timer = null
      // 円形周り
      this.percent = 0
      this.color = '#0ea5e9'
      this.currentPercent = 1
      this.shape = 'M 1 0 A 1 1 0 1 1 1 -1.133107779529596e-15 L 0 0'
    }
  }
}
</script>
