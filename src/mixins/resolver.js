export const resolver = {
  name: "Resolver",
  methods: {
    resolveProductId(productId){
      let product = this.$store.getters.products.find(p => p.uid == productId)
      return product ? product : {}
    },
    resolveCategoryId(categoryId){
      let category = this.$store.getters.categories.find(p => p.uid == categoryId)
      return category ? category : {}
    },
    resolveDepotId(depotId){
      let depot = this.$store.getters.depots.find(d => d.uid == depotId)
      return depot ? depot : {}
    },
    resolveShareId(shareId){
      let shareTypes = this.$store.getters.shareTypes.find(d => d.uid == shareId)
      return shareTypes ? shareTypes : {}
    },

    resolveProductIdToName(productId){
      let foundProduct = this.$store.getters.products.find(p => p.uid == productId)
      let fallback = "not found: " + productId
      return foundProduct ? foundProduct.name : fallback
    }
  }
}

import { DEFAULT_DELIVERY, INDIVIDUAL_DELIVERY, SHOP_DELIVERY, SHARELESS_DELIVERY } from '@/utils/Constants.js'

export const DeliverySelector = {
  name: "DeliverySelector",
  mounted() {
     this.deliveryUid = this.$route.query.delivery
   },
   data () {
     return {
       deliveryUid: undefined
     }
   },
  computed: {
    deliveries() {
      let deliveries = this.$store.getters.deliveries
      return deliveries ? deliveries : []
    },
    isDefaultDelivery(){
      return this.delivery.type.uid == DEFAULT_DELIVERY
    },
    isIndividualDelivery(){
      return this.delivery.type.uid == INDIVIDUAL_DELIVERY
    },
    isShopDelivery(){
      return this.delivery.type.uid == SHOP_DELIVERY
    },
    isSharelessDelivery(){
    return this.delivery.type.uid == SHARELESS_DELIVERY
    },
    delivery() {
      if (this.deliveryUid) 
        return this.deliveries.find(d => this.deliveryUid == d.uid)
      return undefined
    }
  }
}

import { calculateShares } from '@/utils/shareTypeUtils.js'

export const ShareTypeResolver = {
  name: "ShareTypeResolver",
  methods: {
    resolveId(shareId){
      let foundShareType = this.shareTypes.find(p => p.uid == shareId)
      let fallback = {factor: NaN,
                      name: "Not found",
                      type: "Not found",
                      uid: shareId}
      return foundShareType ? foundShareType : fallback
    }
  },
  computed: {
    shareConfig() {
      let calculatedShares = calculateShares(this.$store.getters.users)
      return calculatedShares.map(s => {
        return {
          type: s.type,
          shares: s.shares,
          name: this.resolveId(s.type).name,
          factor: this.resolveId(s.type).factor
        }
      })
    },
    shareTypes() {
      let shareTypes = this.$store.getters.shareTypes
      return shareTypes ? shareTypes : []
    }
  }
}
