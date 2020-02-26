<template>
  <div class="dashboard-container">
    <div class="view-title">Dashboard</div>
    <div class="section">
      Aktionen
      <div class="actions">
        <button class="button" @click="displayRegisterHarvest = true">
          Ernte registrieren
        </button>
        <button class="button">
          Neue Lieferung
        </button>
      </div>
    </div>

    <div class="modal-overlay"
      @click="stopDisplayRegisterHarvest"
      v-if="displayRegisterHarvest" >
      <register-harvest 
        class="modal-content" 
        :preSelectedHarvest="preSelectedHarvest"
        @close="stopDisplayRegisterHarvest"/> 
    </div>

    <div class="recent-products">
      <div class="header">
        Letzte Produkte
      </div>
      <div clas="recent">
        <div class="recent-product" v-for="d in recent" :key="d.uid">
          <button class="button recent-product-button" 
            @click="preSelect(d)">
            {{ d.displayString }} <i class="fa fa-plus-circle"> </i>
          </button>
        </div>
      </div>
    </div>

    <div>
      <div class="section" @click="toggleDisplayInventory">
        Inventar
        <div class="dropdown-icon" :class="{ expanded: displayInventory }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>
      <inventory v-if="displayInventory"/>
    </div>

    <div>
      <div class="section" @click="toggleDisplayHarvest">
        Letzte Ernten
        <div class="dropdown-icon" :class="{ expanded: displayHarvests }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>
         <inventory-history v-if="displayHarvests" :inventoryAtoms="inventoryAtoms" :maxNumber="15"/>
    </div>

  </div>
</template>

<script>
import RegisterHarvest from '@/components/inventory/RegisterHarvest.vue'
import InventoryHistory from '@/components/inventory/InventoryHistory.vue'
import Inventory from '@/components/inventory/Inventory.vue'

import { display } from '@/mixins/display.js'
import { resolver } from '@/mixins/resolver.js'

export default {
  name: 'Dashboard',
  mixins: [display, resolver],
  components: {
    RegisterHarvest,
    Inventory,
    InventoryHistory
  },
  data() {
    return {
      displayRegisterHarvest: false,
      preSelectedHarvest: null,
      displayInventory: false,
      displayHarvests: false,
    }
  },
  methods: {
    preSelect(p){
      this.preSelectedHarvest = this.resolveProductId(p.uid) 
      this.displayRegisterHarvest = true
    },
    stopDisplayRegisterHarvest(){
      this.preSelectedHarvest = null
      this.displayRegisterHarvest = false
    },
    toggleDisplayInventory(){
      this.displayInventory = !this.displayInventory
    },
    toggleDisplayHarvest(){
      this.displayHarvests = !this.displayHarvests
    }
  },
  computed: {
    inventoryAtoms() {
      let inventoryAtoms = this.$store.getters.inventoryAtoms
      return inventoryAtoms ? inventoryAtoms : []
    },
    recent() {
      let items = [...this.inventoryAtoms]
      items.sort((a, b) => a.date > b.date ? -1 : 1)
      let recent =  [...new Set(items.map(i => i.product))]
      let recentProducts = recent.map(r => {
        let retVal = {}
        retVal.uid = r
        retVal.displayString = this.resolveProductIdToName(r)
        return retVal
      })
      if (recentProducts.length > 5)
        return recentProducts.slice(0,5)
      return recentProducts
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/shared.scss';
.section {
  font-size: 18pt;
  padding: 20px;
}
.dasbhoard-container{
  padding: 40px;
}

.actions {
  .button {
    margin: 5px;
  }
}

.recent-products {
  margin: 20px 0px;
}
.recent-product {
  display: inline-block;
  margin: 5px;
}
.recent-product-button {
  i {
    margin-left: 5px;
  }
}

.dropdown-icon {
  display: inline-block;
  transition: 0.2s all;
  width: 24px;
  height: 24px;
  position: relative;
  top: 5px;

  &.expanded {
    transform: rotate(180deg);
  }
}
</style>
