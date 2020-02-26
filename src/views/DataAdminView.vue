<template>
  <div class="data-admin-view-container">
    <data-administration/>

    <div class="internal-link" @click="goToCSVImport">
      CSV Import
    </div>
  </div>
</template>

<script>
import DataAdministration from '@/components/db-admin/DataAdministration.vue'
import { CSV_IMPORT } from '@/router.js'

export default {
  name: 'DataAdminView',
  components: {
    DataAdministration,
  },
  methods: {
    goToCSVImport() {
      this.$router.push({name: CSV_IMPORT}) 
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
