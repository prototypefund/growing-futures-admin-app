<template>
  <div class="inventory-view-container">
    <div class="view-title">Inventar</div>

    <div class="add-button-container">
      <button class="button is-large" 
        @click="displayRegisterHarvest = true">
        <i class="fa fa-plus"></i>
      </button>
    </div>
    <div class="modal-overlay"
      v-if="displayRegisterHarvest"
      @click="displayRegisterHarvest = false">
      <register-harvest
        class="modal-content"
        @close="displayRegisterHarvest = false"/>
    </div>

    <inventory/>
  </div>
</template>

<script>
import Inventory from '@/components/inventory/Inventory.vue'
import RegisterHarvest from '@/components/inventory/RegisterHarvest.vue'

export default {
  name: 'InventoryView',
  components: {
    Inventory,
    RegisterHarvest,
  },
  data() {
    return {
      displayRegisterHarvest: false,
    }
  },
  methods: {
    addToInventory(item) {
      if (this.inventory.find(i => i.name == item.uid))
      {
        this.displayRegisterHarvest = false
        // fixme toast that it is not possible to add an item a second time
        return
      }

      let newInventoryItem = {}
      newInventoryItem.harvestedTotal = 0
      newInventoryItem.name = item.uid
      newInventoryItem.unit = 'g' 
      newInventoryItem.history = []

      this.$store.dispatch('addOrUpdate', {schema: this.schema, item: newInventoryItem} ) 
      this.displayRegisterHarvest = false
    },

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.add-button-container {
  margin-top: 20px;
}
</style>
