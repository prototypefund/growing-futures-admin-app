<template>
  <div class="dropdown-container">
    <div class="dropdown-trigger" @click="show = !show">
      {{ selection || "Bitte wählen" }}
      <div class="dropdown-icon" :class="{ expanded: show }">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
    </div>
    <div class="dropdown-content" :style="{ display: show ? 'block' : 'none'}">
      <div v-for="o in options" class="dropdown-item" :key="o" @click="selected(o)"> {{ o }} </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    preSelection: String,
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false,
      selection: this.preSelection
    }
  },
  methods: {
    selected(o) {
      this.selection = o
      this.show = false
      this.$emit('change', o)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  background-color: white;
  padding: 12px 16px;
  min-width: 250px;
  border: 1px solid $primary;
  border-radius: 5px;
  cursor: pointer;

  .dropdown-icon {
    float: right;
    transition: 0.2s all;
    width: 24px;
    height: 24px;

    &.expanded {
      transform: rotate(180deg);
    }
  }
}

.dropdown-content {
  display: none;
  position: absolute;
  // min-width: 160px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-item {
  background-color: #f9f9f9;
  padding: 12px 16px;

  &:first-child {
    border-radius: 5px 5px 0px 0px;
  }
  &:last-child {
    border-radius: 0px 0px 5px 5px;
  }

  &:nth-child(2) {
    background-color: #ebebeb;
  }

  &:hover {
    background-color: #cfcfcf;
  }
}

</style>
