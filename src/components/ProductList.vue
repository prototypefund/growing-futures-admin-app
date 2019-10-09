<template>
  <div class="product-list-container">
      <div class="grid-container">
        <div class="item" v-for="(item, index) in products" :key=item.name>
          <div class="grid-item" @click.stop="select(item)">
              {{ item.name }}
          </div>
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
@import '@/assets/tiled-grid.scss';
.table-container{
}

.harvest-input {
  width: 100%;
}
</style>
