<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { fetchJson } from '@/services/data-service.js'
export default {
  name: 'App',
  async created() {
    let url = process.env.VUE_APP_SCHEMA_API_ROOT +
      process.env.VUE_APP_SCHEMA_URL
    console.dir("loading schemas from " + url)
    let dataSchemas = await fetchJson(url)
    await this.$store.dispatch('setDataSchemas', dataSchemas)
    await this.$store.dispatch('loadSchemaDefinitions', {})
    this.$store.getters.schemas.forEach(schema =>
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
