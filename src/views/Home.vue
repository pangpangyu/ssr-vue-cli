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
  computed: {
    data () {
      return this.$store.getters.data1
    }
  },
  mounted () {
    console.log(this.$store.getters)
  }
}
</script>
<style lang="scss" scoped>
.home{
  background: #000;
  color: #fff;
}
</style>
