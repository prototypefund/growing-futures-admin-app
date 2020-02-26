<template>
  <div class="resolver-dummy-container">
  </div>
</template>

<script>
import { resolver, ShareTypeResolver } from '@/mixins/resolver.js'
export default {
  mixins: [resolver, ShareTypeResolver],
  name: 'DisplayDummy',
}
</script>

<style lang="scss" scoped>
</style>
