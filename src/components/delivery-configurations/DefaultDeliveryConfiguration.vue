<template>
  <div class="delivery-view-container">
    <div class="view-header-background">
      <div class="view-title">Lieferung</div>
        <div>
          <div class="title">
            {{ delivery.name }}
          </div>
          <div>
            {{ delivery.date | displayDay }} den {{ new Date(delivery.date).toLocaleDateString("de-DE") }}
          </div>
        </div>
        <b-tabs type="is-toggle" v-model="activeTab" expanded>
          <b-tab-item label="Ernte"
            v-touch:swipe.left="swipeLeftInTab"
            v-touch:swipe.right="swipeRightInTab">
            <div  v-for="item in delivery.products" :key=item.name >
              <div class="scene">
                <div class="my-card" @click="productConfiguration(item.uid)" :class="{'is-flipped': isFlipped(item.uid)}" >
                  <div class="card-face product-card card-face-front">
                    <div class="card-content">
                      <div class="card-image">
                        <img v-if="item.image != ''" :src="getImageUrl(item.uid)" alt="">
                      </div>
                      <div class="card-name" > {{ resolveProductIdToName(item.uid) }} </div>
                      <div class="card-amount" @click.stop="productConfiguration(item.uid)"> {{ planned(item) }} </div>
                      <div class="card-unit"> {{item.unit | displayUnit }} </div>
                      <div class="card-shares">
                        <div v-for="share in Object.keys(item.planned)"
                             v-if="(share !='total' && item.planned[share] > 0)" :key="share.uid"> 
                          {{ item.planned[share] }} {{item.unit | displayUnit }} | {{ resolveShareId(share).name }} 
                        </div>
                      </div>
                      <div class="card-info">
                        <span>  Inventar: {{ currentBuffer(item) }}  </span>
                        <span v-if="toHarvest(item) > 0"> | ernten: {{ toHarvest(item) }} </span>
                      </div>
                    </div>
                  </div>
                  <div class="card-face product-card card-face-back">
                    <div class="card-content">
                      <div class="card-image">
                        <img v-if="item.image != ''" :src="getImageUrl(item.uid)" alt="">
                      </div>
                      <div class="card-name" > {{ resolveProductIdToName(item.uid) }} </div>
                      <div class="card-amount" @click.stop="productConfiguration(item.uid)"> {{ planned(item) }} </div>
                      <div class="card-unit"> {{item.unit | displayUnit }} </div>
                      <div class="card-shares"> 
                        <div v-if="toHarvest(item) > 0"> zu ernten: {{ toHarvest(item) }} </div>
                        <div>  Inventar: {{ currentBuffer(item) }}  </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div class="grid-item">
              <button class="button add-button" @click.stop="displayProductSelection=true">
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </b-tab-item>
          <b-tab-item label="Anteile"
            v-touch:swipe.left="swipeLeftInTab"
            v-touch:swipe.right="swipeRightInTab">
            <div class="share-type" v-for="shareType in shareTypes" :key="shareType.type">
              <div class="product-card">
                <div class="share-card" v-if="Array.isArray(delivery.products) &&
                           delivery.products.length">
                  <div id="textbox">
                    <span class="share-card-header">
                      {{ shareType.name }} 
                    </span>
                    <span class="share-card-amount">
                      {{ shareType.shares }} Mal
                    </span>
                    <div style="clear: both;"></div>
                    </div>
                  <share-list :shareProducts="delivery.products"
                              :type=shareType.type 
                              @selected="productConfiguration"/>
                </div>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="Ausgabe"
            v-touch:swipe.left="swipeLeftInTab"
            v-touch:swipe.right="swipeRightInTab">
            <depot-deliveries :delivery="this.delivery"/>
        </b-tab-item>
      </b-tabs>
      <div class="modal-overlay" @click="displayProductSelection=false" v-if="displayProductSelection">
      <product-selection class="modal-content" 
        @close="displayProductSelection=false"
        @selected="addToSelection"/>
      </div>
      <div>
        <button class="button is-medium done-button is-primary is-outlined" @click.stop="finish">
          Deliver <i class="fa fa-check" style="margin-left: 5px;"></i>
        </button>
      </div>
      <div>
        <div class="section" @click="toggleDisplayInventory">
          Inventar
        </div>
        <inventory v-if="displayInventory"/>
      </div>
    </div>
    <product-configuration v-if="displayProductConfiguration"
      :shareTypes="shareTypes"
      :product="selectedProduct"
      @close="displayProductConfiguration = false"
      @done="handleDoneProductConfiguration"
      @remove="removeFromProducts"/>
  </div>
</template>

<script>
/* eslint-disable */

import ProductConfiguration from '@/components/ProductConfiguration.vue'
import ShareList from '@/components/ShareList.vue'
import DepotDeliveries from '@/components/DepotDeliveries.vue'
import ProductSelection from '@/components/ProductSelection.vue'
import Inventory from '@/components/inventory/Inventory.vue'

import { display } from '@/mixins/display.js'
import { resolver } from '@/mixins/resolver.js'
import { getDeliveryForType } from '@/utils/deliveries.js'

export default {
  name: 'DeliveryConfiguration',
  mixins: [display, resolver],
  components: {
    DepotDeliveries,
    Inventory,
    ProductConfiguration,
    ProductSelection,
    ShareList,
  },
  props: {
    shareTypes: Array,
    initialDelivery: Object,
  },
  mounted() {
    if (! this.delivery.products)
    {
      this.delivery.products = []
    }
  },
  data() {
    return {
      flippedCards: [],
      delivery: this.initialDelivery,
      activeTab: 0,
      selectedProduct: null,
      displayInventory: false,
      displayProductSelection: false,
      displayProductConfiguration: false
    }
  },
  methods: {
    isFlipped(uid){
      return this.flippedCards.includes(uid)
    },
    flip(uid){
      return
      if (this.isFlipped(uid)) {
        let idx = this.flippedCards.findIndex(e => e == uid)
        this.flippedCards.splice(idx, 1)
      } else{
      this.flippedCards.push(uid)
      }
    },
    finish(){
      //FIXME should be properly tested
      this.delivery.status = "ready"
      this.delivery.users.forEach(user => {
        let delivery = {}
        delivery.contents = getDeliveryForType(user.shareType, this.delivery.products)
        delivery.contents.forEach(product => {
          product.name = this.resolveProductIdToName(product.uid)
        })
        delivery.name = this.delivery.name
        delivery.date = new Date(this.delivery.date).toISOString()
        delivery.depot = this.resolveDepotId(user.depot)
        user.delivery = delivery 
      })
      this.save()
    },
    swipeRightInTab(){
      if (this.activeTab > 0) {
        this.activeTab = this.activeTab - 1
      }
    },
    swipeLeftInTab(){
      if (this.activeTab < 2) {
      this.activeTab++
      }
    },
    getImageUrl(item)
    {
      return process.env.VUE_APP_SCHEMA_API_ROOT + item.image
    },
    addToSelection(item) {
      let alreadyInList = this.delivery.products
        .filter(i => i.uid == item.uid)
        .length

      let product = {}
      if (!alreadyInList) {
        product.uid = item.uid
        product.unit = item.unit
        product.buffer = 0
        product.planned = {}
        product.planned.total = 0
        this.shareTypes.forEach(shareType => product.planned[shareType.type] = 0)
        product.done = false
        
        this.delivery.products.push(product)
        this.delivery.products = this.delivery.products.sort((u, v) => this.resolveProductIdToName(u.uid) > this.resolveProductIdToName(v.uid) ? 1 : -1)
      }
      this.save()
      this.displayProductSelection = false
    },
    productConfiguration(productUid) {
      this.displayProductConfiguration = true
      this.selectedProduct = this.delivery.products.find(p => p.uid == productUid)
    },
    handleDoneProductConfiguration(r) {
      this.displayProductConfiguration = false
      let products = this.delivery.products
      let idx = products.findIndex(p => p.uid == r.uid)
      this.$set(products, idx, this.$jsonCopy(r))
      this.save()
    },
    toggleDisplayInventory(){
      this.displayInventory = !this.displayInventory
    },
    toHarvest(p){
      return this.planned(p) - this.currentBuffer(p) 
    },
    planned(p) {
      return p.planned.total
    },
    currentBuffer(p) {
      return this.inventoryAmount(p)
    },
    isPlanned(p) {
      return p.planned.total > 0 && p.harvested == 0
    },
    isHarvested(p) {
      return p.harvested > 0
    },
    removeFromProducts(productUid){
      this.displayProductConfiguration = false
      let idx = this.delivery.products.findIndex(p => p.uid == productUid)
      if (idx >= 0)
      {
        this.delivery.products.splice(idx, 1)
      }
      this.save()
      
    },
    save() {
      this.$store.dispatch('addOrUpdate', {schema: this.schema, item: this.delivery} ) 
    },
    inventoryAmount(product) {
      let item = this.inventory.segments.find(i => i.key == product.uid)
      if (item){
        let amount = item.pivot.value.find(v => product.unit == v.unit)
        if (amount) {
          return amount.value
        }
      }
      return 0
      return item
    },
    getImageUrl(productId)
    {
      let item = this.resolveProductId(productId)
      let slug = item.image
      let baseDir = process.env.VUE_APP_SCHEMA_API_ROOT 
      return baseDir + slug
    }

  },
  computed: {
    schema() {
      return this.$store.getters.schemas.find(s => s.schemaName == "deliveries")
    },
    inventory() {
      return this.$store.getters.inventory
    },
    
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
@import '@/assets/tiled-grid.scss';

.label {
  margin-bottom: 10px;
}

.sub-grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:  repeat(5, 1fr);
  grid-gap: 2px;
}

.grid-button {
  float: left;
  width: 100%;
  height: 100%;
  background-color: white;
  text-align: center;
  vertical-align: middle;
}

.grid-item {
  margin: 5px;
  padding: 2px;
  grid-column: 1 / span 4;
}

.add-button {
  width: 100%;
  height: 100%;
}

.title{
  font-size: 15px;
  margin-bottom: 10px;
  font-weight: bold;
  margin-top: 10px;
}

.harvest-header{
  margin-top: 10px;
  margin-left: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: left;
}

.product-ok {
  font-weight: bold;
  background-color: $primary;
  color: white;
}

.product-error {
  background-color: red;
  color: white;
}

.product-planned {
}

.share-header{
  font-size: 20px;
  font-weight: bold;
}

.share {
  padding-top: 20px;
}

.card-content{
  display: grid;
  padding: 12px;
  grid-template-areas:
    "b b b d"
    "a f f f"
    "a h h k"
    "i i i p"
}

img {
  border-style: solid;
  border-color: rgba(black, 0.2);
  border-radius: 8px;
  border-width: 1px;
}

.card-image{
  grid-area: a;  
  max-width: 78px;
  max-height: 78px;
}

.card-name{
  line-height: 30px;
  margin-top: 8px;
  text-align: left;
  font-size: 22px;
  grid-area: b;  
}

.card-check{
  grid-area: c;  
}

.card-amount{
  text-align: right;
  font-size: 30px;
  grid-area: d;  
}

.card-unit{
  font-size: 22px;
  text-align: right;
  grid-area: p;  
}

.card-inventory{
  text-align: left;
  font-size: 15px;
  grid-area: i;  
}

.card-to-harvest{
  text-align: left;
  font-size: 15px;
  grid-area: h;  
}

.card-info{
  line-height: 33px;
  font-size: 12px;
  text-align: left;
  grid-column: 1 / 4;
  grid-row: 4;
}

.card-shares{
  text-align: left;
  grid-column: 2 / 5;
  grid-row: 3 / 4;
}

.scene{
  width: 100%;
  height: 175px;
  max-height: 175px;
  perspective: 600px;
  margin-bottom: 20px;
}

.my-card{
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.share-card{
  padding: 15px;
}

.share-card-header{
  float: left;
  font-size: 22px;
}

.share-card-amount{
  float: right;
  font-size: 22px;
}

.card-face {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
}

.card-face-front {
}

.card-face-back {
  transform: rotateY( 180deg );
}

.my-card.is-flipped {
  transform: rotateY(180deg);
}


</style>
