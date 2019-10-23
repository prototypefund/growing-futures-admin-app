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
          <tr v-for="(p, index) in products" :key="p.name+index"
            @click="selectItem(p)">
            <td>{{p.name}}</td>
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
export default {
  mixins: [display],
  name: 'ShareList',
  props: {
    products: Array,
    type: String
  },
  methods: {
    selectItem(p){
      this.$emit('selected', p.name)
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
