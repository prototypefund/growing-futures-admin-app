<template>
  <div class="inventory-history-container">
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Datum</th>
          <th>Name</th>
          <th>Menge</th>
          <th>Unit</th>
          <th>Wer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(inventoryAtom, index) in sortedAtoms"
            :key="inventoryAtom.uid+index"
            @click="select(inventoryAtom)">
          <td>{{ inventoryAtom.date | displayDate }}</td>
          <td>{{ inventoryAtom.displayString }}</td>
          <td>{{ inventoryAtom.amount }}</td>
          <td>{{ inventoryAtom.unit | displayUnit }}</td>
          <td>{{ inventoryAtom.user }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { display } from '@/mixins/display.js'

export default {
  name: 'InventoryHistory',
  mixins: [display],
  props: {
    inventoryAtoms: Array,
    maxNumber: Number,
    filters: Array,
  },
  methods: {
    select(selection) {
      this.$emit('selected', selection)
    },
    sortByDate(items) {
      items.sort((a, b) => a.date > b.date ? -1 : 1)
      return items
    }
  },
  computed: {
    sortedAtoms() {
      let filteredList = this.$jsonCopy(this.inventoryAtoms)

      if (this.filters) {
        this.filters.forEach( filter => {
          filteredList = filteredList.filter(filter)
        })
      }

      filteredList = this.sortByDate(filteredList)

      if (filteredList.length > this.maxNumber)
      {
        return filteredList.slice(0, this.maxNumber)
      }

      return filteredList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.inventory-history-container {
  padding: 20px;
}

.red{
  color: red;
}

</style>
