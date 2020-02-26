<template>
  <div class="category-amount-container">
    <div class="category-name">
      <b-switch v-model="category.category.includeInPoll"/> {{ category.category.name }}
      <div v-if="category.content && category.content.length > 0" 
        class="expand-subitems" 
        :class="{ expanded: subItemsExpanded }"
        @click="subItemsExpanded = !subItemsExpanded">
        <i class="fa fa-chevron-down"></i>
      </div>
    </div>
    <div v-if="subItemsExpanded" class="sub-items">
      <div v-for="s in category.content" :key="s.name" class="sub-item">
        <b-switch v-model="s.includeInPoll"/> {{ s.name }} 
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryAmount',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      subItemsExpanded: false,
      value: false
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
@import '@/assets/slider.scss';

.category-amount-container {
  text-align: left;
  margin-bottom: 20px;
}

.category-name {
  font-size: 18px;
  font-weight: bold;

  .expand-subitems {
    float: right;
    transition: 0.2s all;

    &.expanded {
      transform: rotate(180deg);
    }
  }
}

.levels {
  display: flex;
  margin: 10px 0px;
  color: rgba($dark, 0.5);

  .level {
    flex: 1;
    text-align: center;
  }
}

.sub-items {
  .sub-item {
    margin: 10px 0px;
    padding-left: 10px;
  }
}
</style>
