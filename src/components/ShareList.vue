<template>
  <div class="share-list-container">
    <div class="table-container">
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Menge</th>
            <th>Einheit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, index) in shareProducts" :key="p.uid+index"
            @click="selectItem(p)">
            <td>{{resolveProductIdToName(p.uid) }}</td>
            <td>{{ planned(p) }}</td>
            <td>{{p.unit | displayUnit }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { display } from '@/mixins/display.js'
import { resolver } from '@/mixins/resolver.js'

export default {
  mixins: [display, resolver],
  name: 'ShareList',
  props: {
    shareProducts: Array,
    type: String
  },
  methods: {
    selectItem(p){
      this.$emit('selected', p.uid)
    },
    planned(p){
      if (p.planned && p.planned[this.type])
      {
        return p.planned[this.type]
      }
      return 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.table-container{
}
</style>
