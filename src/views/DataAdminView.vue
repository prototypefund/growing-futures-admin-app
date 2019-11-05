<template>
  <div class="data-admin-view-container">
    <data-administration/>
  </div>
</template>

<script>
import DataAdministration from '@/components/db-admin/DataAdministration.vue'

export default {
  name: 'DataAdminView',
  components: {
    DataAdministration,
  }
}
</script>

<style lang="scss" scoped>
</style>
