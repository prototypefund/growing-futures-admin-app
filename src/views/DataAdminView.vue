<template>
  <div class="data-admin-view-container">
    <div>
      Edit Data
      <edit-data :schema="schema" :item="{}" @save="save"/>
    </div>
  </div>
</template>

<script>
import veggieSchema from '@/data/vegetableSchema.json'
import EditData from '@/components/db-admin/EditData.vue'

export default {
  name: 'DataAdminView',
  components: {
    EditData,
  },
  data() {
    return {
      schema: veggieSchema,
    }
  },
  methods: {
    save(item){
      console.dir(item)
    }
  },
  props: {
  }
}

</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
</style>
