<template>
  <div>
    <h3>お題: {{ question.name }}</h3>
  </div>
</template>

<script>
export default {
  name: 'NowQuestion',
  data () {
    return {
      question: { id: '123abc', name: 'たけのこきのこ' }
    }
  },
  created () {
    // お題を取得してquestionに入れる処理
  },
  methods: {
  }
}

</script>
