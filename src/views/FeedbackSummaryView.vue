<template>
<div class="feedback-summary-view-container">
  <div class="view-title">Feedback</div>
  <div class="header">
    Feedback Summary
   </div>
    TODO: Some nice statistics
  <div class="header">
    Rückmeldungen verwalten
  </div>
  <div class="button is-medium" @click='goToPollConfig'>
    Jahresumfrage
  </div>
  <div class="button is-medium" @click='goToDeliveryFeedback'>
    Feedback zu Lieferungen
  </div>
</div>
</template>

<script>
import { display } from '@/mixins/display.js'
import {POLL_CONFIGURATION, DELIVERY_FEEDBACK} from '@/router.js'

export default {
  name: 'FeedbackSummaryView',
  mixins: [display],
  methods: {
    goToPollConfig(){
      this.$router.push({name: POLL_CONFIGURATION}) 
    },
    goToDeliveryFeedback(){
      this.$router.push({name: DELIVERY_FEEDBACK}) 
    },
  }
}

</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.button {
  display: block;
  margin: 20px;
}
</style>
