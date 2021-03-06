<template>
  <div class="edit-data-container">
    <div v-for="(p, index) in schemaProperties" :key="index">

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
import DateInput from '@/components/db-admin/DateInput.vue'
import NumberInput from '@/components/db-admin/NumberInput.vue'
import ReadOnly from '@/components/db-admin/ReadOnly.vue'

export default {
  name: 'EditData',
  components: {
    InputSingleSelect,
    InputMultiSelect,
    TextInput,
    DateInput,
    NumberInput,
    ReadOnly,
  },
  data() {
    return {
      item: this.prepareData(this.data)
    }
  },
  props: {
    schema: Object,
    data: Object,
  },
  methods: {
    prepareData(data)
    {
      if (!data)
        data = {}
      Object.keys(this.schema.schema.properties).forEach(k => {
        let d = data[k]
        if (!d)
          data[k] = this.getDefaultValue(this.schema.schema.properties, k)
        })
        return data
    },
    getDefaultValue(spec, key) {
      let t = spec[key].type
      if (t == 'string') {
        return ""
      } else if (t == 'array') {
        return []
      } else if (t == 'object') {
        return {}
      } else if (t == 'date') {
        return new Date()
      } else if (t == 'double') {
        return 0
      }
    },
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
      } else if (this.getSubschema(p).type == 'date') {
        return "date-input"
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
        return {'defaultValue': this.data[p]}
      } else if (this.getSubschema(p).type == 'date') {
        return {'defaultValue': new Date(Date.parse(this.data[p]))}
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
      if ("properties" in this.loadedSchema)
      {
        let properties = Object.keys(this.loadedSchema.properties)
        properties.sort((a,b) => {
          let num1 = this.loadedSchema.properties[a].xOrder 
          let num2 = this.loadedSchema.properties[b].xOrder
          if (!num1)
            num1 = 999
          if (!num2)
            num2 = 999
          let val = num1 - num2
          return  val
        })
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
