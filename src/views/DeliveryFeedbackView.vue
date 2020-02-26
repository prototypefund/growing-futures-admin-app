<template>
<div class="poll-configuration-view-container">
  <div class="header">
    Delivery Feedback
  </div>
  <div class="link" @click="goToFeedbackSummary">
    back
  </div>
</div>
</template>

<script>
import { FEEDBACK_SUMMARY } from '@/router.js'
import { display } from '@/mixins/display.js'

export default {
  name: 'DeliveryFeedbackView',
  mixins: [display],
  methods: {
    goToFeedbackSummary(){
      this.$router.push({name: FEEDBACK_SUMMARY}) 
    },
  }
}

</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
</style>
