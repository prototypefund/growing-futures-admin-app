<template>
  <div class="edit-data-container">
    <div v-for="p in schemaProperties">

      <div class="header">
        {{ loadedSchema.properties[p].xDisplay }}
      </div>
      <!-- ARRAY -->
      <div v-if="loadedSchema.properties[p].type == 'array'">
        <div v-if="loadedSchema.properties[p].items.type == 'string'">
          FIXME Multi-Select or Dropdown
        </div>
      </div> 

      <!-- STRING -->
      <div v-if="loadedSchema.properties[p].type == 'string'">
        <input v-model="item[p]"/>
      </div> 
    </div>
    <div class="button save-button" @click="save">
      Save
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditData',
  data() {
    return {
      item: {},
    }
  },
  props: {
    schema: Object,
    data: Object,
  },
  methods: {
    save(){
      this.$emit('save', this.item)
    }
  },
  computed:{
    schemaProperties() {
      console.dir(this.loadedSchema)
      if ("properties" in this.loadedSchema)
      {
        return Object.keys(this.loadedSchema.properties)
      }
      return []
    },
    loadedSchema() {
      if ("schema" in this.schema) {
        return this.schema.schema
      }
      return {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.header{
  font-weight: bold;
  font-size: 18pt;
}
.table-container{
}
</style>
