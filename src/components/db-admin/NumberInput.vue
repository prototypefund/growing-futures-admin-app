<template>
  <div class="number-input">
      <input class="input" @input="$emit('update', $event.target.value)" v-model="input"/>
  </div>
</template>

<script>
export default {
  name: 'NumberInput',
  components: {
  },
  data () {
    return {
      input: this.defaultValue
    }
  },
  props: {
    defaultValue: Number,
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.header{
  font-weight: bold;
  font-size: 18pt;
}
.table-container{
}
</style>
