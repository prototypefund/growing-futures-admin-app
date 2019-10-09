<template>
  <div class="product-list-container">
    <div class="table-container">
			<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
					<thead>
						<tr>
							<th>Produkt</th>
							<th>Geerntet</th>
							<th>Geplant</th>
							<th>Einheit</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(p, index) in products" :key="p.name+index">
							<td>{{p.name}}</td>
              <td @click="toggleHarvestInput">
                <span v-if="!harvestInput" v-model="p.harvested">
                  {{ p.harvested }}
                </span>
                <input v-else type="number"
                              ref="harvest"
                              @keyup.enter="harvestinput = !harvestinput"
                              @click.stop
                              class="harvest-input"
                              v-model="p.harvested"/>
              </td>
							<td>{{p.planned.total}}</td>
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
  data() {
    return {
      harvestInput: false,
    }
  },
  props: {
    products: Array,
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
    toggleHarvestInput(e) {
      console.dir("click")
      this.harvestInput = !this.harvestInput 
      console.dir(this.$refs)
      this.$nextTick(() => {
          this.$refs.harvest.select()
          this.$refs.harvest.focus()
        })
    },
  }
}
</script>

<style lang="scss" scoped>
.table-container{
}

.harvest-input {
  width: 100%;
}
</style>
