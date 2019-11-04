<template>
  <div class="input-single-select-container">
    <dropdown @change="update"
              :preSelection="selection"
              :options="displayOptions"/>
  </div>
</template>

<script>
import Dropdown from '@/components/utils/Dropdown.vue'
export default {
  name: 'InputSingleSelect',
  props: {
    selection: String,
    options: Array,
    schema: Object,
  },
  components: {
    Dropdown,
  },
  data () {
    return {
      selectedOption: this.selection
    }
  },
  methods: {
    update(e) {
      console.dir(e)
      this.$emit('update', e)
    }
  },
  computed: {
    displayOptions() {
      return this.options.map(o => o.name)
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
