<template>
  <div class="delivery-management-view-container">
    <div class="view-title">Lieferungen</div>
    <div class="content">

    <div class="add-button-container">
      <button class="button is-large" 
        @click="toggleDisplayNewDelivery"
        @close="disableDisplayNewDelivery"> 
        <i class="fa fa-plus"></i> 
      </button>
    </div>
    <div class="product-card" v-for="(delivery, index) in activeDeliveries" 
        @click="goToConfiguration(delivery)"
        :key="delivery.date+index" >
      <div class="card-content">
        <div class="card-name">
          {{ delivery.name }}
        </div>
        <div class="card-date">
          {{ delivery.date | localeDate }}
        </div>
        <div class="card-type">
          {{ delivery.type | deliveryType }}
        </div>
        <div class="card-status">
          {{ delivery.status }}
        </div>
        <button class="button card-edit is-large is-info is-inverted"
          @click.stop="editDelivery(delivery)"> 
          <i class="fa fa-cog"></i> 
        </button> 
        <button class="button card-remove is-large is-inverted" :class="{'is-danger': delivery.status == 'new', 'is-info': delivery.status == 'ready'}"
          @click.stop="remove(delivery)"> 
          <i :class="{'fa fa-trash': delivery.status == 'new', 'fa fa-archive': delivery.status == 'ready'}"></i>
        </button> 
      </div>
    </div>


    <data-modifier v-if="selectedItem" :data="selectedItem"
                    :schema="getSchema('deliveries')"
                    @click.stop
                    @close="selectedItem = null"
                    />
    
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Datum</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(delivery, index) in archivedDeliveries" :key="delivery.date+index"
          @click="goToSummary()">
          <td>{{ delivery.name }}</td>
          <td>{{ delivery.date | localeDate }}</td>
          <td>{{ delivery.status }}</td>
        </tr>
      </tbody>
    </table>

  </div>
  <div class="modal-overlay"
    v-if="displayNewDelivery"
    @click="disableDisplayNewDelivery" >
    <new-delivery 
      :delivery="deliveryToEdit()" 
      class="modal-content"
      @close="disableDisplayNewDelivery"/>
  </div>

  </div>
</template>

<script>
import {DELIVERY_SUMMARY, DELIVERY_CONFIGURATION} from '@/router.js'
import DataModifier from '@/components/db-admin/DataModifier.vue'
import NewDelivery from '@/components/NewDelivery.vue'
import { display } from '@/mixins/display.js'
import { emptyDelivery } from '@/utils/deliveries.js'

export default {
  name: 'DeliveryManagementView',
  mixins: [display],
  components: {
    DataModifier,
    NewDelivery
  },
  data() {
    return {
      selectedItem: null,
      displayNewDelivery: false,
    }
  },
  methods: {
    toggleDisplayNewDelivery() {
      this.displayNewDelivery = !this.displayNewDelivery 
    },
    remove(delivery){
      let schema = this.getSchema('deliveries')
      if (delivery.status == 'ready'){
        console.dir("archiving")
        delivery.status = 'archived'
        console.dir(delivery)
        this.$store.dispatch('addOrUpdate', {schema: schema, item: delivery} ) 
      }
      else {
        this.$store.dispatch('remove', {schema: schema, item: delivery}) 
      }
    },
    disableDisplayNewDelivery() {
      this.displayNewDelivery = !this.displayNewDelivery 
      this.selectedItem = null
    },
    editDelivery(delivery){
      this.selectedItem = delivery
      this.toggleDisplayNewDelivery()
    },
    getSchema(name) {
      return this.$store.getters.schemas.find(s => s.schemaName==name)
    },
    goToSummary(){
      this.$router.push({name: DELIVERY_SUMMARY}) 
    },
    goToConfiguration(delivery){
      this.$router.push({name: DELIVERY_CONFIGURATION, query: { delivery: delivery.uid}})
    },
    newDelivery(){
      let delivery = emptyDelivery()
      delivery.users = this.$jsonCopy(this.$store.getters.users)
      return delivery
    },
    deliveryToEdit() {
      return this.selectedItem ? this.selectedItem : this.newDelivery()
    },
  },
  computed: {
    deliveries() {
      let deliveries = this.$store.getters.deliveries
      return deliveries ? deliveries : []
    },
    activeDeliveries(){
      return this.deliveries.filter(d => d.status != 'archived').sort( (a,b) =>
        {
          a.date - b.date < 0
        })
    },
    archivedDeliveries() {
      return this.deliveries.filter(d => d.status == 'archived').sort( (a,b) =>
        {
          a.date - b.date < 0
        })
    }
  },
  filters: {
    localeDate(date) {
      let d = new Date(Date.parse(date))
      return d.toLocaleDateString("de-DE")
    },
    deliveryType(type){
      if (type) {
        return type.displayString
      }
      return "error: no type"
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.content {
  padding: 20px;
}

.add-button-container {
  margin-bottom: 40px;
}

.card-content{
  display: grid;
  padding: 12px;
  grid-template-areas:
    "b b b d"
    "a f f f"
    "h h h k"
    "r e i i"
}


.card-name{
  line-height: 30px;
  margin-top: 8px;
  text-align: left;
  font-size: 22px;
  grid-area: b;  
}

.card-status{
  line-height: 30px;
  margin-top: 8px;
  text-align: left;
  font-size: 14px;
  grid-area: a;  
}

.card-edit{
  width: 50px;
  height: 50px;
  grid-area: e;
}

.card-type {
  grid-area: i;
}

.card-remove{
  width: 50px;
  height: 50px;
  grid-area: r;
}

.card-date{
  line-height: 30px;
  margin-top: 8px;
  text-align: right;
  font-size: 16px;
  grid-area: d;  
}


</style>
