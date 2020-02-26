<template>
  <div class="register-harvest-container" @click.stop>
    <div class="modal-close-icon" @click="$emit('close')">
      <i class="fa fa-times"></i>
    </div>
    <product-selection
          v-if="!harvestSelected"
          :presetSearch="presetSearch"
          @selected="productSelected"
          @close="$emit('close')"/>

    <div v-if="harvestSelected">
      Ernte registrieren
      <div class="header">
        {{ productName }}
      </div>
      <div class="content">
        <div class="image">
          <img v-if="productImage" :src="getImageUrl(selectedProduct)" alt=""/>
        </div>
        <div>
          Menge <input type="number" class="input" v-model.number="inventoryAtom.amount">
        </div>
        <div>
          <dropdown @change="selectUnit" :options="units"/>
        </div>
        <div>
          <div class="picker">
            <b-datepicker
              v-model="inventoryAtom.date"
              placeholder="Click to select..."
              icon="calendar-today">
            </b-datepicker>
          </div>
        </div>
        <button :disabled="infoPresent" class="button" @click="addAtomToInventory">
          add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductSelection from '@/components/ProductSelection.vue'
import Dropdown from '@/components/utils/Dropdown.vue'
import { UNITS } from '@/utils/Constants.js'
import { display } from '@/mixins/display.js'

export default {
  name: 'RegisterHarvest',
  mixins: [display],
  components: {
    Dropdown,
    ProductSelection
  },
  props: {
    preSelectedHarvest: Object,
  },
  mounted() {
    this.units = UNITS.map(u => {
      let retVal = {}
      retVal.uid = u
      retVal.displayString = this.displayProductUnit(u)
      return retVal
    })
  },
  data () {
    return {
      units: [],
      selectedProduct: this.preSelectedHarvest,
      presetSearch: "",
      inventoryAtom: {product: "",
                      date: new Date(),
                      amount: 0,
                      unit: undefined,
                      type: 'harvest',
                      user: this.$loggedInUser()}
    }
  },
  methods: {
    addAtomToInventory() {
      this.inventoryAtom.date = this.inventoryAtom.date.toISOString()
      this.inventoryAtom.product = this.selectedProduct.uid
      this.$store.dispatch('addOrUpdate', {schema: this.schema, item: this.inventoryAtom} ) 
      this.$emit('close')
    },
    selectUnit(selection){
      this.inventoryAtom.unit = selection.uid
    },
    productSelected(product){
      this.selectedProduct = product
    },
    getImageUrl(item)
    {
      let baseDir = process.env.VUE_APP_SCHEMA_API_ROOT 
      let slug = item.image
      return baseDir + slug
    }
  },
  computed: {
    harvestSelected() {
      return this.selectedProduct ? true : false
    },
    productName() {
      if (this.selectedProduct)
        return this.selectedProduct.name
      return ""
    },
    productImage() {
      if (this.selectedProduct)
        return this.selectedProduct.image
      return ""
    },
    schema() {
        return this.$store.getters.schemas.find(s => s.schemaName == "inventory")
    },
    infoPresent(){
      return (this.inventoryAtom.unit && this.inventoryAtom.amount) ? false : true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
.register-harvest-container{
  position: relative;
  padding: 20px;
}
.content {
  div {
    margin: 10px 0px;
  }
}

.image{
  display: inline-block;
  width: 50%
}


.header {
  font-size: 18pt;
}
</style>
