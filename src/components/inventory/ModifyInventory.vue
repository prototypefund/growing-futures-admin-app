<template>
  <div class="modify-inventory-container modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="modal-close-icon" @click="$emit('close')">
        <i class="fa fa-times"/>
      </div>

      <div class="icon">
          icon
      </div>

      <div class="header">
        {{ resolveProductIdToName(inventoryForProduct.key) }}
      </div>

      <div class="reconcile-container">
        <div class="reconcile" v-for="item in inventoryForProduct.pivot.value" :key="item.unit">
          <div v-if="!reconcileItem(item)" class="harvested">
            {{ item.value }} 
          </div>

          <div v-else class="harvested">
            <input type="number"
              class="input inline-input"
              ref="reconcile"
              @keyup.enter="reconcileFor(item)" 
              v-model="reconciledAmount">
          </div>

          <div class="unit">
            {{ item.unit | displayUnit }}
          </div>

          <button class="button" 
            @click="reconcileFor(item)"> 
              <i :class='{"fa fa-check": reconcileItem(item), 
                          "fa fa-edit": !reconcileItem(item)}'></i>
          </button>

        </div>
      </div>
      <div class="header">
        History
      </div>
      <inventory-history :filters="historyFilters" :inventoryAtoms="inventoryAtoms" :maxNumber="10"/>
    </div>
  </div>
</template>

<script>
import { display } from '@/mixins/display.js'
import { resolver } from '@/mixins/resolver.js'
import InventoryHistory from '@/components/inventory/InventoryHistory.vue'

export default {
  name: 'ModifyInventory',
  components: {
    InventoryHistory,
  },
  mixins: [display, resolver],
  props: {
    inventoryForProduct: Object,
  },
  data() {
    return {
      reconcile: false,
      reconciledAmount: 0,
      reconcileUnit: null,
     }
  },
  methods: {
    reconcileItem(i){
      return this.reconcileUnit == i.unit
    },
    reconcileFor(i){
      if (this.reconcileItem(i)){
        this.saveReconcilation(i) 
        this.reconcileUnit = null
        this.reconciledAmount = 0
      } else {
        this.reconcileUnit = i.unit
        this.reconciledAmount = i.value
      }
    },
    close(){
      this.$emit('close', this.inventoryForProduct)
    },
    saveReconcilation(item){
      let reconcilationAmount = this.reconciledAmount - item.value
      if (reconcilationAmount == 0)
        return

      let reconcilationTransaction = this.createReconcilationTransaction(item)  
      this.$store.dispatch('addOrUpdate', {schema: this.schema, item: reconcilationTransaction} ) 
    },
    createReconcilationTransaction(item) {
      let reconcilationAmount = this.reconciledAmount - item.value
      return {product: this.inventoryForProduct.key,
              date: new Date().toISOString(),
              amount: reconcilationAmount,
              unit: item.unit,
              type: 'reconcilation',
              user: this.$loggedInUser()}
    }
  },
  computed: {
    inventoryAtoms() {
      let inventoryAtoms = this.$store.getters.inventoryAtoms
      return inventoryAtoms ? inventoryAtoms : []
    },
    schema() {
        return this.$store.getters.schemas.find(s => s.schemaName == "inventory")
    },
    historyFilters() {
      return [f => f.product == this.inventoryForProduct.key]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.red{
  color: red;
}

.table-container{
}

.reconcile {
  margin: 10px;
  line-height: 36px;
}

.inline-input {
  width: 100px;
  display: inline;
}

.harvested {
  display: inline-block;
  width: 20%;
}
.unit {
  display: inline-block;
  width: 20%;
}
</style>
