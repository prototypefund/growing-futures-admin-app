<template>
  <div class="data-admin-view-container">
    <div class="view-header" >
      Datentypen
    </div>
    <div v-for="schema in schemas"
         class="schemas"
         v-bind:key="schema.schemaName">
      <div class="button" @click="selection=schema">
        {{ schema.schemaName }}
      </div>
    </div>

    <div v-for="item in loadedItems">
    </div>
    <div>
      Edit Data
      <edit-data :schema="selection" :data="{}" @save="save"/>
    </div>
  </div>
</template>

<script>
import EditData from '@/components/db-admin/EditData.vue'

export default {
  name: 'DataAdminView',
  components: {
    EditData,
  },
  data() {
    return {
      selectedDataType: {},
      selection: {},
    }
  },
  methods: {
    save(item){
      console.dir(item)
    },
  },
  props: {
  },
  computed: {
    schemas () {
      return this.$store.getters.schemas
    }
  }
}

</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
</style>
