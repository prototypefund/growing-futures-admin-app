<template>
  <div class="input-multi-select-container">
    {{ schema.xType }} from the following:
    <div v-for="d in options">
      <input type="checkbox" :id="d.uid" :value="d.uid" v-model="choices">
      <label :for="d.uid">{{ d.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputMultiSelect',
  data() {
    return {
      choices: [],
    }
  },
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
