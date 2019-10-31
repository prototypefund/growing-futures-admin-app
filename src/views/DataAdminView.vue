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

    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <th v-for="attr in attributes">
            {{ selection.schema.properties[attr].xDisplay }}
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
      <edit-data :schema="selection" :data="selectedItem" @save="save"/>
    </div>
  </div>
</template>

<script>
import EditData from '@/components/db-admin/EditData.vue'
import { getData } from '@/services/data-service.js'

export default {
  name: 'DataAdminView',
  components: {
    EditData,
  },
  data() {
    return {
      selectedDataType: {},
      selection: {},
      selectedItem: null,
    }
  },
  methods: {
    save(item){
      this.selectedItem = null
      console.dir(item)
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
      return getData(this.selection)
    },
    attributes () { 
      if ("schema" in this.selection && "properties" in this.selection.schema)
      {
        return Object.keys(this.selection.schema.properties)
      }
    }
  },
  filters: {
    displayNicely: function (data) {
      console.log(typeof(data))
      console.dir(data)
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
</style>
