<template>
  <div class="input-single-select-container">
      <input class="input" @input="$emit('update', $event.target.value)" v-model="input"/>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  components: {
  },
  data () {
    return {
      input: this.defaultValue
    }
  },
  props: {
    defaultValue: String,
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
