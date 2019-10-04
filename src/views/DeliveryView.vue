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

        <product-list :products="products"/>
          
        <product-selection v-if="productSelection"
          @close="productSelection=false"
          @selected="addToSelection"/>

        <div class="harvest-header">Ausgabeplan</div>
        <div class="share-type" v-for="shareType in shareTypes" :key="shareType.type">
            <share-calculation :shareType=shareType :shareTypes=shareTypes />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ShareCalculation from '@/components/ShareCalculation.vue'
import ProductList from '@/components/ProductList.vue'
import ProductSelection from '@/components/ProductSelection.vue'

export default {
  name: 'Delivery',
  components: {
    ShareCalculation,
    ProductList,
    ProductSelection,
  },
  data() {
    return {
      days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      shareTypes: [{
                    type: "small",
                    name: "Kleiner Anteil"
                    },
                    {
                    type: "big",
                    name: "Großer Anteil"
                    }],
      nextDelivery: new Date("2019-10-04"),
      upcomingDeliveries: [new Date("2019-10-04"), new Date("2019-10-11"), new Date("2019-10-18"), new Date("2019-10-25")],
      previousDeliveries: [new Date("2019-09-27"), new Date("2019-09-20"), new Date("2019-09-13"), new Date("2019-10-06")],
      products: [],
      productSelection: false
    }
  },
  methods: {
    addToSelection(item) {
      let alreadyInList = this.products
        .filter(i => i.name == item.name)
        .length

      if (!alreadyInList)
      {
        this.products.push(item)
      }
      this.closeProductSelection()
    },
    closeProductSelection(){
      this.productSelection = false
    }
  },
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

.share-type{
}
</style>
