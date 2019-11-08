<template>
  <div class="product-selection-container modal-overlay" @click="$emit('close')">
    <div class="modal-content">
      <div class="quick-search" v-if="!displayAddItem">
        Suchen <input v-on:click.stop @input="searchTerm=$event.target.value" />
      </div>
      <div class="grid-container" v-if="!displayAddItem">
        <div class="item" v-for="(item, index) in displayedItems" :key=item.name @click.stop="select(item)">
          <div class="grid-item">
            {{ item.name }}
            <img v-if="item.image != ''" :src="getImageUrl(item)" alt="">
          </div>
        </div>
        <div v-if="searchTerm != ''" class="grid-item" @click.stop="select(item)">
           <button class="button add-button" @click.stop="displayAddItem=true">
              <i class="fa fa-plus"></i>
            </button>
        </div>
     </div>

     <data-modifier v-if="displayAddItem" :data="{name: searchTerm}"
                    :schema="$store.getters.schemas.find(s => s.schemaName='products')"
                    @click.stop
                    @close="displayAddItem = false"
                    />

     <button v-if="lastSelection" class="button back-button" @click.stop="back()">
       <i class="fa fa-chevron-down" style="margin-left:8px;">zurück</i>
     </button>


    </div>
   
  </div>
</template>

<script>
import { getData } from '@/services/data-service.js'
import DataModifier from '@/components/db-admin/DataModifier.vue'

export default {
  name: 'ProductSelection',
  props: {
    shareType: Object,
    shareTypes: Array
  },
  components: {
    DataModifier,
  },
  data() {
    return {
      searchTerm: '',
      items: [],
      manuallySelectedItem: this.$store.getters.data.categories,
      lastSelection: null,
      selecteItem: {},
      displayAddItem: false,
    }
  },
  methods: {
    select(selection) {
      let items = this.products.filter(item => item.categories.includes(selection.uid))
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
    },
    getImageUrl(item)
    {
      let baseDir = process.env.VUE_APP_SCHEMA_API_ROOT 
      let slug = item.image
      console.dir(baseDir)
      console.dir(slug)
      return baseDir + slug
    }
  },
  computed: {
    products: function() {
      return this.$store.getters.products
    },
    categories: function() {
      return this.$store.getters.categories
    },
    displayedItems: function () {
      if (this.searchTerm == ''){
        return this.manuallySelectedItem;
      } else {
        let searchString = item => 
          { 
            let name = item.name 
            console.log(item.categories)
            let cat = this.categories.filter(c => item.categories.includes(c.id))
            console.dir(cat)
            return name
          }
        return this.products.filter(i =>
          searchString(i).toLowerCase().includes(this.searchTerm.toLowerCase()))
      }
    },
  },
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
