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
            <td>{{displayUnit(p.unit)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShareList',
  props: {
    products: Array,
    type: String
  },
  methods: {
    displayUnit(unit){
      switch (unit) {
        case "p":
          return "Stück"
        case "g":
          return "kg"
        default:
          return "k/A"
      }
    },
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
