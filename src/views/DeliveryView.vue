<template>
  <div class="delivery-view-container">
    <div class="view-header-background">
      <div class="view-title">Lieferung</div>
        <div class="next-delivery">
          {{ days[nextDelivery.getDay()] }} den {{ nextDelivery.toLocaleDateString("de-DE") }}
        </div>

        <div class="harvest-header">
          Ernteplan

          <button class="button add-button" @click.stop="productSelection=true">
            <i class="fa fa-plus"></i>
          </button>
        </div>

        <product-list v-if="Array.isArray(products) && products.length" 
          :products="products"/>
          
        <product-selection v-if="productSelection"
          @close="productSelection=false"
          @selected="addToSelection"/>

        <div class="harvest-header">Ausgabeplan</div>
          <div class="share-type" v-for="shareType in shareTypes" :key="shareType.type">
            <div class="share" v-if="Array.isArray(products) && products.length">
              {{ shareType.name }}
              <share-list :products="shareSplit[shareType.name]" :type=shareType.name
                @addPlanned="updateShare"/>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
import ShareList from '@/components/ShareList.vue'
import ProductSelection from '@/components/ProductSelection.vue'

export default {
  name: 'Delivery',
  components: {
    ProductList,
    ShareList,
    ProductSelection,
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
      productSelection: false
    }
  },
  methods: {
    addToSelection(item) {
      let alreadyInList = this.products
        .filter(i => i.name == item.name)
        .length

      if (!alreadyInList) {
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
      this.productSelection = false
    },
    updateShare(o){
      console.log("updating")
      let split = this.shareSplit[o.type].find(item => item.name == o.product)
      this.$set(split, 'planned', o.planned)
      this.productSummary()
    },
    productSummary() {
      this.products.forEach(prod => {
        let result = []
        this.shareTypes.forEach(type => {
          let found = this.shareSplit[type.name].find(splitElement => splitElement.name == prod.name)
          let amount = found.planned * type.shares
          result.push(amount)
        })
        let veggi = this.products.find(item => item.name == prod.name)
        this.$set(veggi, 'planned', result.reduce((a, b) => a + b, 0))
      })
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
