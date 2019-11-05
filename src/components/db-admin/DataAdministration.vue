<template>
  <div class="data-admin-view-container">
    <div class="view-header" >
      Datentypen
    </div>
    <dropdown @change="select" :options="schemaOptions"/>
    <button v-if="selection" class="button" @click="selectItem({})"> add </button>

    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <th v-for="attr in attributes">
            {{ selectedSchema.schema.properties[attr].xDisplay }}
        </th>
      </thead>
      <tbody>
        <tr v-for="item in loadedItems" @click="selectItem(item)">
          <td v-for="key in attributes">
            {{ item[key] | displayNicely }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="selectedItem">
      Edit Data
      <data-modifier :schema="selectedSchema" :data="selectedItem" @save="save"/>
    </div>
  </div>
</template>

<script>
import DataModifier from '@/components/db-admin/DataModifier.vue'
import Dropdown from '@/components/utils/Dropdown.vue'
import { getData } from '@/services/data-service.js'

export default {
  name: 'DataAdministration',
  components: {
    DataModifier,
    Dropdown,
  },
  data() {
    return {
      selection: "",
      selectedItem: null,
    }
  },
  methods: {
    save(item){
      //return this.$store.getters.schemas
      this.selectedItem = null
    },
    select(selection){
      this.selection = selection
    },
    selectItem(item) {
      if (this.selectedItem)
      {
        this.selectedItem = null
      } else {
        this.selectedItem = item
      }
    }
  },
  props: {
  },
  computed: {
    schemas () {
      return this.$store.getters.schemas
    },
    loadedItems () {
      let items = this.$store.getters.data[this.selectedSchema.schemaName]
      return items
    },
    attributes () { 
      if (!this.selectedSchema)
      {
        return []
      }
      if ("schema" in this.selectedSchema && "properties" in this.selectedSchema.schema)
      {
        return Object.keys(this.selectedSchema.schema.properties)
      }
      return []
    },
    schemaOptions() {
      return this.schemas.map(s => s.schemaName)
    },
    selectedSchema() {
      if (this.selection){
        let schema = this.schemas.find(s => s.schemaName == this.selection) 
        this.$store.dispatch("loadForSpec", schema)
        return schema
      }
      return {}
    }
  },
  filters: {
    displayNicely: function (data) {
      if (Array.isArray(data)) {
        return data.reduce((a,b) => a.concat(b, ","), "" )
      }
      if ("object" == typeof(data)) {
        return Object.values(data).reduce((a,b) => a.concat(b, ","), "" )
      }
      return data
    }
  }
}

</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
.data-admin-view-container{
  padding: 40px;
}
</style>
