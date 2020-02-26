<template>
  <div class="input-single-select-container">
    <dropdown @change="update"
              :preSelection="preSelection"
              :options="displayOptions"/>
  </div>
</template>

<script>
import Dropdown from '@/components/utils/Dropdown.vue'
export default {
  name: 'InputSingleSelect',
  created() {
    let matchingOption = this.options.find(o => o.uid == this.selection) 
    if (matchingOption){
      this.preSelection = matchingOption.name
    }
  },
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
      preSelection: "",
      selectedOption: this.selection
    }
  },
  methods: {
    update(e) {
      let option = this.options.find(o => o.name == e)
      this.$emit('update', option.uid)
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
