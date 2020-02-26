<template>
  <div class="depot-delivery-container">
    <div class="depotCard" v-for="d in amountsPerDepot" :key="d.depot">
      <div class="product-card">
        <div class="card-content">
          <div>
            <div id="textbox">
              <span class="share-card-header">
                {{ resolveDepotId(d.depot).name}} 
              </span>
              <span class="share-card-amount"> </span>
              <div style="clear: both;"></div>
            </div>
          </div>
          <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Menge</th>
                <th>Einheit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, index) in d.products" v-if="p.amount > 0" :key="p.product+index">
                <td>{{resolveProductIdToName(p.product) }}</td>
                <td>{{ getAmount(p)}}</td>
                <td>{{p.unit | displayUnit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { display } from '@/mixins/display.js'
import { resolver } from '@/mixins/resolver.js'
import { getAmountsPerDepot } from '@/utils/deliveries.js'
import ShareList from '@/components/ShareList.vue'
import Constants from "@/utils/Constants.js"

export default {
  mixins: [display, resolver],
  name: 'DepotDeliveries',
  components: {
    ShareList,
  },
  props: {
    delivery: Object
  },
  methods: {
    getAmount(product) {
      if (product.unit ==  Constants.WEIGHT){
        return product.amount.toFixed(2)
      }
      return product.amount
    }
  },
  computed: {
    amountsPerDepot() {
      return getAmountsPerDepot(this.delivery)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';


.card-content{
  padding: 12px;
}

.share-card-header{
  float: left;
  font-size: 22px;
}

</style>
