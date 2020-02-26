<template>
  <div class="delivery-summary-container">
      <div class="header">
        Depots
      </div>
    <div class="header">
      Anteilsmengen
    </div>
  </div>
</template>

<script>
import ProductConfiguration from '@/components/ProductConfiguration.vue'
import ShareList from '@/components/ShareList.vue'
import ProductSelection from '@/components/ProductSelection.vue'

import { display } from '@/mixins/display.js'

export default {
  name: 'DeliverySummary',
  mixins: [display],
  components: {
    ShareList,
    ProductSelection,
    ProductConfiguration,
  },
  props: {
    shareTypes: Array,
    delivery: Object,
  },
  mounted() {
    if (! this.delivery.products)
    {
      this.delivery.products = []
    }
  },
  data() {
    return {

      shareSplit: [],
      mySplits: [],
      displayInventory: false,
      displayProductSelection: false,
      displayProductConfiguration: false,
      selectedProduct: null
    }
  },
  methods: {
    getImageUrl(item)
    {
      let baseDir = process.env.VUE_APP_SCHEMA_API_ROOT 
      let slug = item.image
      return baseDir + slug
    },
    addToSelection(item) {
      let alreadyInList = this.delivery.products
        .filter(i => i.name == item.name)
        .length

      if (!alreadyInList) {
        item.planned = {}
        item.planned.total = 0
        this.shareTypes.forEach(type => item.planned[type] = 0)
        item.harvested = 0
        item.done = false
        
        // clone object to make everything reactive
        item = JSON.parse(JSON.stringify(item));
        this.delivery.products.push(item)
      }
      this.closeProductSelection()
    },
    closeProductSelection(){
      this.displayProductSelection = false
    },
    productConfiguration(product) {
      this.displayProductConfiguration = true
      this.selectedProduct = this.delivery.products.find(p => p.name == product)
    },
    handleDoneProductConfiguration(r) {
      this.displayProductConfiguration = false
      let idx = this.delivery.products.findIndex(p => p.name == r.name)
      this.delivery.products.splice(idx, 1)
      this.delivery.products.push(r)
    },
    toggleProductDone(r) {
      var product = this.delivery.products.find(p => p.name == r.name)
      product.done = !product.done
    },
    toggleDisplayInventory(){
      this.displayInventory = !this.displayInventory
    },
    plannedOrHarvested(p) {
      if (p.harvested > 0) {
        return p.harvested
      }
      return p.planned.total
    },
    currentBuffer(p) {
      return this.inventoryAmount(p)
    },
    isPlanned(p) {
      return p.planned.total > 0 && p.harvested == 0
    },
    isHarvested(p) {
      return p.harvested > 0
    },
    done() {
      let splits = []
      this.shareTypes.forEach(item =>
        splits.push({"name": item.name, "type": item.type, "contents": []}))
      this.delivery.products.forEach(product => this.addToSplits(splits, product))

      this.mySplits.length = 0
      splits.forEach(s => this.mySplits.push(s))
      this.save()
    },
    addToSplits(splits, product) {
      splits.forEach(s => s.contents.push({"name": product.name,
        "unit": product.unit,
        "amount": product.planned[s.type],
        "note": "some note or not"}))
    },
    removeFromProducts(productName){
      this.displayProductConfiguration = false
      let idx = this.delivery.products.findIndex(p => p.name == productName)
      this.delivery.products.pop(idx)
    },
    save() {
      this.$store.dispatch('addOrUpdate', {schema: this.schema, item: this.delivery} ) 
    },
    inventoryAmount(product) {
      let item = this.inventory.segments.find(i => i.key == product.uid)
      if (item){
        let amount = item.pivot.value.find(v => product.unit == v.unit)
        if (amount) {
          return amount.value
        }
      }
      return 0
      return item
    },

  },
  computed: {
    schema() {
      return this.$store.getters.schemas.find(s => s.schemaName == "deliveries")
    },
    inventory() {
      return this.$store.getters.inventory
    },
    
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
@import '@/assets/tiled-grid.scss';

.label {
  margin-bottom: 10px;
}

.sub-grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:  1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 20% 1fr 1fr;
  grid-gap: 2px;
}

.sub-grid-header {
  grid-column: 1 / span 6;
}

.grid-button {
  float: left;
  width: 100%;
  height: 100%;
  background-color: white;
  text-align: center;
  vertical-align: middle;
}

.grid-item {
  margin: 5px;
  padding: 2px;
  grid-column: 1 / span 4;
}

.sub-grid-item {
}


.add-button {
  width: 100%;
  height: 100%;
}

.title{
  font-size: 15px;
  margin-bottom: 10px;
  font-weight: bold;
}

.harvest-header{
  margin-top: 10px;
  margin-left: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: left;
}

.product-ok {
  font-weight: bold;
  background-color: $primary;
  color: white;
}

.product-error {
  background-color: red;
  color: white;
}

.product-planned {
}

.share-header{
  font-size: 20px;
  font-weight: bold;
}

.share {
  padding-top: 20px;
}

.done-button{

}

.share-type{
}
</style>
