<template>
  <div class="delivery-view-container">
    <div v-if="delivery">
      <div v-if="isDefaultDelivery">
        <default-delivery-configuration 
          :initialDelivery="delivery"
          :shareTypes="shareConfig"/>
      </div>
      <div v-else-if="isIndividualDelivery">
        <individual-delivery-configuration 
          :initialDelivery="delivery"
          :shareTypes="shareConfig"/>
      </div>
      <div v-else-if="isShopDelivery">
        TODO: SHOP STUFF
      </div>
      <div v-else-if="isSharelessDelivery">
        TODO: SHARELESS
      </div>
      <div v-else>
        TODO: ERROR, no delivery type
      </div>
    </div>
    <div v-else>
      TODO: ERROR, no delivery
    </div>
  </div>
</template>

<script>
import DefaultDeliveryConfiguration from '@/components/delivery-configurations/DefaultDeliveryConfiguration.vue'
import IndividualDeliveryConfiguration from '@/components/delivery-configurations/IndividualDeliveryConfiguration.vue'
import { DeliverySelector, ShareTypeResolver } from '@/mixins/resolver.js'

export default {
  name: 'DeliveryView',
  mixins: [DeliverySelector,
           ShareTypeResolver],
  components: {
    DefaultDeliveryConfiguration,
    IndividualDeliveryConfiguration,
  }
 }
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

</style>
