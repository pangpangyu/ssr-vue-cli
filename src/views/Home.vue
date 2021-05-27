<template>
  <div class="home">
    <p>123456</p>
    <p>{{ data.hitokoto }}</p>
    <p><router-link to="/about">about</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  asyncData ({ store, route }) {
    console.log(route.path)
    return store.dispatch('getText')
  },
  data () {
    return {
      info: {}
    }
  },
  computed: {
    data () {
      return this.$store.getters.data1
    }
  },
  mounted () {
    // this.getDate()
    console.log(this.$store.getters)
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
