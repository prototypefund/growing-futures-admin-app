<template>
  <div class="input-single-select-container">
    {{ displayString }}
  </div>
</template>

<script>
export default {
  name: 'InputSingleSelect',
  props: {
    displayString: String
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
