<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ data.hitokoto }}</p>
    <p><router-link to="/">index</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'About',
  asyncData ({ store, route }) {
    return store.dispatch('getText2')
  },
  computed: {
    data () {
      return this.$store.getters.data2
    }
  },
  mounted () {
    console.log(this.$store.getters)
  }
}
</script>
