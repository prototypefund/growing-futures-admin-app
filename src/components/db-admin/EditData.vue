<template>
  <div class="edit-data-container">
    <div v-for="p in Object.keys(schema.properties)">

      <div class="header">
        {{ schema.properties[p].xDisplay }}
      </div>
      <!-- ARRAY -->
      <div v-if="schema.properties[p].type == 'array'">
        <div v-if="schema.properties[p].items.type == 'string'">
          FIXME Multi-Select or Dropdown
        </div>
      </div> 

      <!-- STRING -->
      <div v-if="schema.properties[p].type == 'string'">
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
      item: {}
    }
  },
  props: {
    schema: Object,
  },
  methods: {
    save(){
      this.$emit('save', this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.header{
  font-weight: bold;
  font-size: 12pt;
}
.table-container{
}
</style>
