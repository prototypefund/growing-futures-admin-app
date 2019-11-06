<template>
  <div class="edit-data-container">
    <div v-for="p in schemaProperties">

      <div class="header">
        {{ loadedSchema.properties[p].xDisplay }}
      </div>

      <div>
        <component :is="getComponent(p)" @update="update(p, $event)" v-bind="getProps(p)"> </component>
      </div>

    </div>
  </div>
</template>

<script>
import InputSingleSelect from '@/components/db-admin/InputSingleSelect.vue'
import InputMultiSelect from '@/components/db-admin/InputMultiSelect.vue'
import TextInput from '@/components/db-admin/TextInput.vue'
import NumberInput from '@/components/db-admin/NumberInput.vue'
import ReadOnly from '@/components/db-admin/ReadOnly.vue'
import { getData } from '@/services/data-service.js'

export default {
  name: 'EditData',
  components: {
    InputSingleSelect,
    InputMultiSelect,
    TextInput,
    NumberInput,
    ReadOnly,
  },
  data() {
    return {
      item: JSON.parse(JSON.stringify(this.data))
    }
  },
  props: {
    schema: Object,
    data: Object,
  },
  methods: {
    update(p, value){
      this.item[p] = value
      this.$emit('update', this.item)
    },
    getReferencedData(name){
      let schema = this.loadedSchema.properties[name]
      let data = this.$store.getters.data[schema.xRef]
      return data
    },
    getSubschema(p){
      return this.loadedSchema.properties[p]
    },
    getComponent(p) {
      if (this.restrictionProperty(p) == 'read-only')
      {
        return 'read-only'
      }

      if (this.hasRef(p)){
        let subschema = this.getSubschema(p)
        if (subschema.xType == 'singleSelect')
        {
          return "input-single-select"
        } else if (subschema.xType == 'multiSelect')
        {
          return "input-multi-select"
        }
      } else if (this.getSubschema(p).type == 'string') {
        return "text-input"
      } else if (this.getSubschema(p).type == 'double') {
        return "number-input"
      } else if (this.getSubschema(p).type == 'object'){
        return "edit-data"
      }
    },
    getProps(p) {
      if (this.restrictionProperty(p) == 'read-only')
      {
        return {'displayString': this.data[p]}
      }

      if (this.hasRef(p)){
        return {'options': this.getReferencedData(p), 
                'schema': this.getSubschema(p),
                'selection': this.data[p]}
      } else if (this.getSubschema(p).type == 'string') {
        return {'defaultValue': this.data[p]}
      } else if (this.getSubschema(p).type == 'double') {
        console.dir(typeof this.data[p])
        return {'defaultValue': this.data[p]}
      } else if (this.getSubschema(p).type == 'object'){
        return {"schema": {"schema": this.getSubschema(p)}, "data": this.data[p]}
      }
    },
    restrictionProperty(p){
      return this.schema.schema.properties[p].xRestrictions
    },
    hasRef(p){
      let schema = this.getSubschema(p)
      let keys = Object.keys(schema)
      return keys.includes('xRef')
    }
  },
  computed:{
    schemaProperties() {
      console.dir(this.loadedSchema)
      if ("properties" in this.loadedSchema)
      {
        let properties = Object.keys(this.loadedSchema.properties)
        console.dir(properties)
        return properties
      }
      return []
    },
    loadedSchema() {
      if ("schema" in this.schema) {
        return this.schema.schema
      }
      return {}
    },
  },
  watch: {
    item: function(){
      console.dir("emmitting update to next level")
      this.$emit('update', this.item)
    } 
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.edit-data-container{
  padding: 40px;
}

.header{
  font-weight: bold;
  font-size: 18pt;
}
.table-container{
}
</style>
