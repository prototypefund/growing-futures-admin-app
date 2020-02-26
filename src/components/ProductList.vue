<template>
  <div class="product-list-container">
      <div class="grid-container">
        <div class="item" v-for="item in products" :key=item.name>
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
    toggleHarvestInput() {
      this.harvestInput = !this.harvestInput 
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
