<template>
  <div class="delivery-view-container">
    <div class="view-header-background">
      <div class="view-title">Lieferung</div>
        <div class="next-delivery">
          {{ days[nextDelivery.getDay()] }} den {{ nextDelivery.toLocaleDateString("de-DE") }}
        </div>

        <div class="harvest-header">
          Ernteplan

          <button class="button add-button" @click.stop="displayProductSelection=true">
            <i class="fa fa-plus"></i>
          </button>


        </div>

        <product-list v-if="Array.isArray(products) && products.length" 
          :products="products"/>
          
        <product-selection v-if="displayProductSelection"
          @close="displayProductSelection=false"
          @selected="addToSelection"/>

        <div class="harvest-header">Ausgabeplan</div>
          <div class="share-type" v-for="shareType in shareTypes" :key="shareType.type">
            <div class="share" v-if="Array.isArray(products) && products.length">
              {{ shareType.name }} ({{ shareType.shares }} Mal)
              <share-list :products="products" :type=shareType.type
                @selected="productConfiguration"/>
            </div>
          </div>
        </div>

        <product-configuration v-if="displayProductConfiguration"
          :shareTypes="shareTypes"
          :product="selectedProduct"
          @close="displayProductConfiguration = false"
          @done="handleDoneProductConfiguration"/>

  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
import ProductConfiguration from '@/components/ProductConfiguration.vue'
import ShareList from '@/components/ShareList.vue'
import ProductSelection from '@/components/ProductSelection.vue'

export default {
  name: 'Delivery',
  components: {
    ProductList,
    ShareList,
    ProductSelection,
    ProductConfiguration,
  },
  data() {
    return {
      days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      shareTypes: [{
                    type: "big",
                    name: "Großer Anteil",
                    factor: 1,
                    shares: 46
                    },
                    {
                    type: "small",
                    name: "Kleiner Anteil",
                    factor: 0.5 ,
                    shares: 38
                    }],
      nextDelivery: new Date("2019-10-04"),

      products: [],
      shareSplit: {},
      displayProductSelection: false,
      displayProductConfiguration: false,
      selectedProduct: null
    }
  },
  methods: {
    addToSelection(item) {
      let alreadyInList = this.products
        .filter(i => i.name == item.name)
        .length

      if (!alreadyInList) {
        item.planned = {}
        this.shareTypes.forEach(type => item.planned[type] = 0)
        item.harvested = 0
        this.products.push(item)

        this.shareTypes.forEach( elt => {
          if (!this.shareSplit[elt.name]) {
            this.$set(this.shareSplit, elt.name, [])
          }
          let splitItem = JSON.parse(JSON.stringify(item));
          this.shareSplit[elt.name].push(splitItem)})
      }
      this.closeProductSelection()
    },
    closeProductSelection(){
      this.displayProductSelection = false
    },
    productConfiguration(product) {
      this.displayProductConfiguration = true
      this.selectedProduct = this.products.find(p => p.name == product)
    },
    handleDoneProductConfiguration(r) {
      this.displayProductConfiguration = false
      let idx = this.products.findIndex(p => p.name == r.name)
      this.products.splice(idx, 1)
      this.products.push(r)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.label {
  margin-bottom: 10px;
}


.next-delivery{
  font-size: 15px;
  margin-bottom: 10px;
  font-weight: bold;
}

.harvest-header{
  margin-top: 10px;
  margin-left: 5px;
  font-weigh: bold;
  font-size: 1.5rem;
  text-align: left;
}

.share-header{
  font-size: 20px;
  font-weight: bold;
}

.share {
  padding-top: 20px;
}

.share-type{
}
</style>
