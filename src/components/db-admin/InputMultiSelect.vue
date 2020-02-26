<template>
  <div class="input-multi-select-container">
    {{ schema.xType }} from the following:
    <br>
    <span v-for="d in options" :key="d.uid">
      <button class="button" :class="{ 'highlight-button': itemSelected(d.uid)}"
              @click.stop="toggleItem(d.uid)"> {{d.uid}} </button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'InputMultiSelect',
  props: {
    options: Array,
    schema: Object,
  },
  data() {
    return {
      choices: [],
    }
  },
  methods: {
    toggleItem(uid){
      console.dir(uid)
      if (!this.itemSelected(uid))
      {
        this.choices.push(uid)
      } else {
        let i = this.choices.findIndex(c => c==uid)
        this.choices.splice(i,1)
      }
      this.$emit('update', this.choices)
    },
    itemSelected(uid) {
      return this.choices.includes(uid) 
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

.highlight-button {
  background-color: lightblue;
  color: black;
  &:hover {
    background-color: lighten(lightblue, 5%);
  }

}
.table-container{
}
</style>
