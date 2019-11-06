<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  async created() {
    await this.$store.dispatch('loadSchemaDefinitions', {})
    await this.$store.getters.schemas.forEach(schema =>
      {
        this.$store.dispatch('loadForSpec', schema)
      })
  },
}
 

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
