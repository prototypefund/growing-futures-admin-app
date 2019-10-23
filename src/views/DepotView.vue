<template>
  <div class="depot-view-container">
    <div v-for="depot in depots" class="depot-table">
      <h1>{{ depot.name }}</h1>
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
						<tr v-for="(p, index) in depot.delivery" :key="p.name+index">
							<td>{{p.name}}</td>
							<td>{{p.amount}}</td>
							<td>{{p.unit}}</td>
						</tr>
					</tbody>
				</table>
			</div>
    </div>


  </div>
</template>

<script>
import Constants from '@/utils/Constants.js'

export default {
  name: 'DepotView',
  components: {
  },
  data() {
    return {
      depots: [
        {
          "name": "Krummennaab",
          "delivery": 
          [
            {
              "name": "Broccoli",
              "amount": 223,
              "unit": Constants.PIECE
            },
            {
              "name": "Karotten",
              "amount": 80,
              "unit": Constants.WEIGHT
            }
          ]
        },
        {
          "name": "Weiden",
          "delivery": 
          [
            {
              "name": "Broccoli",
              "amount": 128,
              "unit": Constants.PIECE
            },
            {
              "name": "Karotten",
              "amount": 12,
              "unit": Constants.WEIGHT
            }
          ]
        }

      ]
    }
  },
  methods: {
  },
  props: {
    shareType: Object,
    shareTypes: Array
  }
}

</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
</style>
