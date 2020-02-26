<template>
  <div class="date-input-container">
    <b-datepicker
      v-model="input"
      placeholder="Click to select..."
      icon="calendar-today">
    </b-datepicker>
  </div>
</template>

<script>
export default {
  name: 'DateInput',
  components: {
  },
  data () {
    return {
      input: this.defaultValue
    }
  },
  props: {
    defaultValue: Date,
  },
  watch: {
    input: function(){
      this.$emit('update', this.input.toISOString())
    }
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
