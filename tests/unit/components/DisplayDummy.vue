<template>
  <div class="resolver-dummy-container">
    <div class="unit-test">
      {{ unit | displayUnit }}
    </div>
  </div>
</template>

<script>
import { display } from '@/mixins/display.js'
export default {
  mixins: [display],
  name: 'DisplayDummy',
  props: {
    unit: String,
  }
}
</script>

<style lang="scss" scoped>
</style>
