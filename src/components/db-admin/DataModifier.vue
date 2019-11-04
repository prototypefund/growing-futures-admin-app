<template>
  <div class="data-modifier-container">
    <edit-data @update="update" :schema="schema" :data="data" />
    <div class="button save-button">
      Save
    </div>
  </div>
</template>

<script>
import EditData from '@/components/db-admin/EditData.vue'

export default {
  name: 'DataModifier',
  props: {
    schema: Object,
    data: Object,
  },
  components: {
    EditData,
  },
  data () {
    return {
      item: JSON.parse(JSON.stringify(this.data)),
      input: this.defaultValue
    }
  },
  methods: {
    update(updatedItem) {
      console.log("DATA MODIFIER")
      console.dir(updatedItem)
      this.item = updatedItem
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
