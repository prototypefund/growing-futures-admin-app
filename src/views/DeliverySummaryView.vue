<template>
  <div class="delivery-summary-view-container">
    <delivery-summary :delivery="delivery"/>
  </div>
</template>

<script>
import { DeliverySelector } from '@/mixins/resolver.js'

export default {
  name: 'DeliverySummary',
  mixins: [DeliverySelector],
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
</style>
