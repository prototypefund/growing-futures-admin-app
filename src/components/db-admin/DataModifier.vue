<template>
  <div class="data-modifier-container">
    <edit-data @update="update" :schema="schema"
      :data="JSON.parse(JSON.stringify(data))" />
    <div class="button save-button" @click.stop="save">
      Save
    </div>
    <div class="button delete-button" @click="remove">
      Remove
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
    save()
    {
      this.$store.dispatch('addOrUpdate', {schema: this.schema, item: this.item} ) 
      this.$emit('close')
    },
    remove()
    {
      if (!this.item.uid)
      {
        this.$emit('close')
      }
      else
      {
        this.$store.dispatch('remove', {schema: this.schema, item: this.item} ) 
        this.$emit('close')
      }
    },
    update(updatedItem) {
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
.delete-button{
  background-color: red;
}
</style>
