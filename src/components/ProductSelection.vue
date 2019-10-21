<template>
  <div class="product-selection-container modal-overlay" @click="$emit('close')">
    <div class="modal-content">
      <div class="quick-search">
        Suchen <input @click.stop @input="searchTerm=$event.target.value" />
      </div>
      <div class="grid-container">
        <div class="item" v-for="(item, index) in displayedItems" :key=item.name>
          <div class="grid-item" @click.stop="select(item)">
            {{ item.name }}
          </div>
        </div>
        <div v-if="searchTerm != ''" class="grid-item" @click.stop="select(item)">
           <button class="button add-button" @click.stop="displayProductSelection=true">
              <i class="fa fa-plus"></i>
            </button>
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
import categories from '@/data/categories.json'

export default {
  name: 'ProductSelection',
  data() {
    return {
      searchTerm: '',
      items: items,
      categories: categories,
      manuallySelectedItem: categories,
      lastSelection: null,
      selecteItem: {},
    }
  },
  methods: {
    select(selection) {
      let items = this.items.filter(item => item.categories.includes(selection.id))
      console.dir(items)
      if (items.length > 0)
      {
        this.lastSelection = this.manuallySelectedItem
        this.manuallySelectedItem = items
      }
      else
      {
        this.$emit('selected', selection)
        this.selectedItem = {}
      }
      this.selectedItem = selection
    },
    back(){
      this.manuallySelectedItem = this.lastSelection
      this.lastSelection = null
      this.selecteItem = {}
    },
    save(){
      this.back()
    }
  },
  computed: {
    displayedItems: function () {
      if (this.searchTerm == ''){
        return this.manuallySelectedItem;
      } else
      {
        let searchString = item => 
          { 
            let name = item.name 
            console.log(item.categories)
            let cat = this.categories.filter(c => item.categories.includes(c.id))
            console.dir(cat)
            return name
          }
        return this.items.filter(i =>
          searchString(i).toLowerCase().includes(this.searchTerm.toLowerCase()))
      }
    },
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

.add-button {
  width: 100%;
  height: 100%;
}

.quick-search{
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
