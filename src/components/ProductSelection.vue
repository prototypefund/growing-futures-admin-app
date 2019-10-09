<template>
  <div class="product-selection-container modal-overlay"
              @click="$emit('close')">
    <div class="modal-content">
      <div class="grid-container">
        <div class="item" v-for="(item, index) in displayedItems" :key=item.name>
          <div class="grid-item" @click.stop="select(item)">
            {{ item.name }}
          </div>
        </div>
     </div>

      <button v-if="lastSelection" class="button back-button" @click.stop="back()">
        <i class="fa fa-chevron-down" style="margin-left:8px;">zurück</i>
      </button>

    </div>
  </div>
</template>

<script>
import items from '@/data/vegetables.json'

export default {
  name: 'ProductSelection',
  data() {
    return {
      items: items,
      displayedItems: items,
      lastSelection: null,
      selecteItem: {},
    }
  },
  methods: {
    select(item) {
      if (item.items)
      {
        this.lastSelection = this.displayedItems
        this.displayedItems = item.items
      }
      else
      {
        this.$emit('selected', item)
        this.selectedItem = {}
      }
      this.selectedItem = item
    },
    back(){
      this.displayedItems = this.lastSelection
      this.lastSelection = null
      this.selecteItem = {}
    },
    save(){
      this.back()
    }
  },
  props: {
    shareType: Object,
    shareTypes: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/assets/shared.scss';
@import '@/assets/tiled-grid.scss';
</style>
