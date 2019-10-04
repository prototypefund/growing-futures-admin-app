<template>
  <div class="product-list-container">
			<div class="table-container">
			<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
					<thead>
						<tr>
							<th>Produkt</th>
							<th>Geerntet</th>
							<th>Bedarf</th>
							<th>Einheit</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(p, index) in products" :key="p.name+index">
							<td>{{p.name}}</td>
							<td>{{p.amount}}</td>
							<td>{{p.amount}}</td>
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
  name: 'ProductList',
  props: {
    products: Array,
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
