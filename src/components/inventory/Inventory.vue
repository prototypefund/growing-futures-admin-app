<template>
  <div class="inventory-container">
    <div class="content">
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Menge</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(inventoryItem, index) in inventory.segments"
              :key="inventoryItem.key+index" 
              @click="modifyInventory(inventoryItem)">
            <td>{{ resolveProductIdToName(inventoryItem.key) }}</td>
            <td> <div v-for="unit in inventoryItem.pivot.value" :key="unit.unit"> {{ unit.value }}
                {{ displayProductUnit(unit.unit) }}  </div> </td>
          </tr>
        </tbody>
      </table>

      <div v-if="showModifyInventory" >
        <modify-inventory :inventoryForProduct="selectedItem" @close="closeInventoryItemDetail"/>
      </div>

    </div>
  </div>
</template>

<script>
import RegisterHarvest from '@/components/inventory/RegisterHarvest.vue'
import ModifyInventory from '@/components/inventory/ModifyInventory.vue'
import { display } from '@/mixins/display.js'
import { resolver } from '@/mixins/resolver.js'
import { pivotizeInventory } from '@/utils/inventory/inventory.js'

export default {
  name: 'Inventory',
  mixins: [display, resolver],
  components: {
    ModifyInventory,
    RegisterHarvest
  },
  data() {
    return {
      displayRegisterHarvest: false,
      showModifyInventory: false,
      selectedItemKey: null,
    }
  },
  methods: {
    modifyInventory(inventoryItem)
    {
      this.selectedItemKey=inventoryItem.key
      this.showModifyInventory=true
    },
    closeInventoryItemDetail(){
       this.showModifyInventory = false
       this.selectedItemKey = null
    }
  },
  computed: {
    schema() {
        return this.$store.getters.schemas.find(s => s.schemaName == "inventory")
    },
    selectedItem() {
      return this.inventory.segments.find(a => this.selectedItemKey == a.key)
    },
    inventory() {
      let inventoryAtoms = this.$store.getters.inventoryAtoms
      let pivot = pivotizeInventory(inventoryAtoms, ['product'], ['unit'])
      return pivot
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
.content {
  padding: 20px;
}
</style>
