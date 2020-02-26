<template>
  <div class="product-selection-container">
    <div class="modal-close-icon" @click="$emit('close')">
      <i class="fa fa-times"/>
    </div>
    <div class="modal-back-icon" v-if="lastSelection" @click.stop="back()">
      <i class="fa fa-chevron-left"></i>
    </div>

    <div>
      <div class="quick-search" v-if="!displayAddItem">
        Suche <input class="input" @click.stop @input="searchTerm=$event.target.value" />
      </div>
      <div class="grid-container"
        v-if="!displayAddItem">
        <div class="item my-card" v-for="item in displayedItems" :key=item.name @click.stop="select(item)">
          <div class="grid-item">
            {{ item.name }}
            <img v-if="item.image" :src="getImageUrl(item)" alt="">
          </div>
        </div>
        <div v-if="searchTerm != ''" class="grid-item" @click.stop="select(item)">
           <button class="button add-button" @click.stop="displayAddItem=true">
              <i class="fa fa-plus"></i>
            </button>
        </div>
     </div>

     <data-modifier v-if="displayAddItem" :data="{name: searchTerm}"
                    :schema="$store.getters.schemas.find(s => s.schemaName=='products')"
                    @click.stop
                    @close="displayAddItem = false"
                    />

     <button v-if="lastSelection" class="button back-button" @click.stop="back()">
       <i class="fa fa-chevron-left" style="margin-right:8px;"></i>zurück
     </button>


    </div>
   
  </div>
</template>

<script>
import DataModifier from '@/components/db-admin/DataModifier.vue'

export default {
  name: 'ProductSelection',
  props: {
    shareType: Object,
    shareTypes: Array,
    presetSearch: String
  },
  components: {
    DataModifier,
  },
  data() {
    return {
      searchTerm: this.presetSearch ? this.presetSearch : "",
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
      console.log("swipe")
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
        let target = item => item.name.toLowerCase()
        return this.products.filter(i => {
          let searchTerms = this.searchTerm.toLowerCase().split('|')
          return searchTerms.some(t => target(i).includes(t))
        })
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/assets/shared.scss';
@import '@/assets/tiled-grid.scss';

.product-selection-container {
  padding: 20px;
}

.add-button {
  width: 100%;
  height: 100%;
}

.my-card{
  border-radius: 10px;
  border-width: 1px;
  box-shadow: 4px 2px 8px rgba(black, 0.5);
  padding: 5px;
  margin: 5px;
  word-break: break-word;
}

img {
  border-color: rgba(black, 0.2);
  border-radius: 8px;
  border-width: 1px;
}

.quick-search{
  padding-top: 10px;
  padding-bottom: 10px;
}

.back-button {
  margin-top: 20px;
}
</style>
