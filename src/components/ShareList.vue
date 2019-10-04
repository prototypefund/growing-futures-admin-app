<template>
  <div class="share-list-container">
			<div class="table-container">
			<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
					<thead>
						<tr>
							<th>Produkt</th>
							<th>Berechnet</th>
							<th>Geplant</th>
							<th>Einheit</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(p, index) in products" :key="p.name+index">
							<td>{{p.name}}</td>
							<td>{{p.amount}}</td>
              <td>
                <b-input v-model="p.planned"
                         @input="$emit('addPlanned', {'product': p.name,
                                 'planned': p.planned, 'type': type })"></b-input>
              </td>
							<td>{{displayUnit(p.unit)}}</td>
						</tr>
					</tbody>
				</table>
			</div>
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
          return "Gramm"
        default:
          return "k/A"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container{
}
</style>
