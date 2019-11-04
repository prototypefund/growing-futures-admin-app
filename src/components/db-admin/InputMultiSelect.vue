<template>
  <div class="input-multi-select-container">
    {{ schema.xType }} from the following:
    <div v-for="d in options">
      {{ d.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputMultiSelect',
  props: {
    options: Array,
    schema: Object,
  },
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
