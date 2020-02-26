<template>
  <div class="new-delivery-container" @click.stop>
    <div class="header">
      Neue Lieferung
    </div>
    <div class="modal-close-icon" @click="$emit('close')">
      <i class="fa fa-times"></i>
    </div>
    <div class="content">
      <div>
        Name <input class="input" v-model="delivery.name">
      </div>
      <div>
        <div class="picker">
          <b-datepicker
            v-model="delivery.date"
            placeholder="Click to select..."
            icon="calendar-today">
          </b-datepicker>
        </div>
      </div>
      <dropdown @change="select" :options="deliveryTypes()"
                          :preSelection="delivery.type"/>
    </div>
    <div> 
      <button class="button" @click="saveDelivery">
        save
      </button>
    </div>
    </div>
  </div>
</template>

<script>
import { Delivery } from '@/utils/deliveries.js'
import Dropdown from '@/components/utils/Dropdown.vue'
import { DEFAULT_DELIVERY, INDIVIDUAL_DELIVERY,SHOP_DELIVERY,SHARELESS_DELIVERY } from '@/utils/Constants.js'

export default {
  name: 'NewDelivery',
  components: {
    Dropdown,
  },
  props: {
    delivery: Object,
  },
  methods: {
    saveDelivery() {
      this.$store.dispatch('addOrUpdate', {schema: this.schema, item: this.delivery} ) 
      this.$emit('close')
    },
    select(selection){
      if (this.delivery){
      this.delivery.type = selection
      }
    },
    deliveryTypes() {
      return [{uid: DEFAULT_DELIVERY,
               displayString: "SoLawi"}, 
              {uid: INDIVIDUAL_DELIVERY,
               displayString: "Individuell"},
              {uid: SHOP_DELIVERY,
               displayString: "Luzernenhof-Style"},
              {uid: SHARELESS_DELIVERY,
               displayString: "Lieferung"}]
    }
  },
  computed: {
    schema() {
        return this.$store.getters.schemas.find(s => s.schemaName == "deliveries")
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
.new-delivery-container {
  padding: 40px;
}
.header {
  font-size: 18pt;
}

.content {
  div {
    margin: 10px 0px;
  }
}
</style>
