<template>
  <div class="share-calculation-container">
    <div class="share-table">
      <h1>{{ shareType.name }}</h1>
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
						<tr v-for="(p, index) in products" :key="p.name+index">
							<td>{{p.name}}</td>
							<td>{{p.amount}}</td>
							<td>{{p.unit}}</td>
						</tr>
					</tbody>
				</table>
			</div>
    </div>

    <button class="add-button" @click="configureDelivery = true">
      <i class="fa fa-chevron-down" style="margin-left:8px;"></i>
    </button>

    <configure-delivery v-if="configureDelivery"
      @close="configureDelivery = false" :shareTypes=shareTypes />
  </div>
</template>

<script>
import ConfigureDelivery from '@/components/ConfigureDelivery.vue'
export default {
  name: 'ShareCalculation',
  components: {
    ConfigureDelivery,
  },
	data() {
		return {
      configureDelivery: false,
			products: [],
			shareProducts: []
      }
	},
  props: {
    shareType: Object,
    shareTypes: Array
  }
}
</script>

<style lang="scss" scoped>

</style>
