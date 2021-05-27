<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ info.hitokoto }}</p>
    <p><router-link to="/">index</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      info: {}
    }
  },
  mounted () {
    // this.getDate()
  },
  methods: {
    getDate () {
      this.$api.getTest().then(res => {
        this.info = res
      })
    }
  }
}
</script>
