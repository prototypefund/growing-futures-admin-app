<template>
  <div class="delivery-view-container">
    <div class="view-header-background">
      <div class="view-title">Lieferung</div>
        <div class="next-delivery">
          {{ days[nextDelivery.getDay()] }} den {{ nextDelivery.toLocaleDateString("de-DE") }}
        </div>

        <div class="harvest-header">
          Ernteplan
       </div>

        <div class="grid-container">
          <div class="grid-item" v-for="(item, index) in products"
            :key=item.name @click.stop="productConfiguration(item.name)">
              <div class="sub-grid">
                <div class="sub-grid-header">
                  {{ item.name }}
                </div>
                <div class="sub-grid-item planned">
                  <div class="grid-button" :class="{'product-error': item.buffer<0,
                                                    'product-ok': item.buffer>0}">
                  {{ item.buffer }}
                  </div>
                </div>
                <div class="sub-grid-item check">
                  <div class="grid-button"
                       :class="{'product-ok': item.done}"
                       @click.stop="toggleProductDone(item)">
                    <i v-if="item.done" class="fa fa-check"></i>
                    <i v-else class="fa fa-check"></i>
                  </div>
                </div>
                <div class="sub-grid-header planned">
                  <div class="grid-button" :class="{'product-planned': isPlanned(item),
                                          'product-ok': isHarvested(item)}">
                    {{ plannedOrHarvested(item) }}  {{displayUnit(item.unit)}}
                  </div>
                </div>

            </div>
          </div>
          <div class="grid-item">
            <button class="button add-button" @click.stop="displayProductSelection=true">
              <i class="fa fa-plus"></i>
            </button>
          </div>
        </div>

          
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
import ProductConfiguration from '@/components/ProductConfiguration.vue'
import ShareList from '@/components/ShareList.vue'
import ProductSelection from '@/components/ProductSelection.vue'

export default {
  name: 'Delivery',
  components: {
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
    displayUnit(unit){
      switch (unit) {
        case "p":
          return "Stück"
        case "g":
          return "kg"
        default:
          return "k/A"
      }
    },
    addToSelection(item) {
      let alreadyInList = this.products
        .filter(i => i.name == item.name)
        .length

      if (!alreadyInList) {
        item.planned = {}
        item.planned.total = 0
        this.shareTypes.forEach(type => item.planned[type] = 0)
        item.harvested = 0
        item.done = false
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
      console.log(product)
      this.selectedProduct = this.products.find(p => p.name == product)
      console.log(this.selectedProduct)
    },
    handleDoneProductConfiguration(r) {
      this.displayProductConfiguration = false
      let idx = this.products.findIndex(p => p.name == r.name)
      this.products.splice(idx, 1)
      this.products.push(r)
    },
    toggleProductDone(r) {
      var product = this.products.find(p => p.name == r.name)
      product.done = !product.done
    },
    plannedOrHarvested(p) {
      if (p.harvested > 0) {
        return p.harvested
      }
      return p.planned.total
    },
    isPlanned(p) {
      return p.planned.total > 0 && p.harvested == 0
    },
    isHarvested(p) {
      return p.harvested > 0
    }
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 20% 1fr 1fr;
  grid-gap: 2px;
}

.sub-grid-header {
  grid-column: 1 / span 2;
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
  padding: 2px;
}

.sub-grid-item {
}


.add-button {
  width: 100%;
  height: 100%;
}

.next-delivery{
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
  background-color: yellow;
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
