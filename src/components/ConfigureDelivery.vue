<template>
  <div class="configure-delivery-container modal-overlay"
              @click="$emit('close')">
    <div class="modal-content">

      <div v-if="showItemConfiguration == false" class="grid-container">
        <div class="item" v-for="(item, index) in displayedItems" :key=item.name>
          <div class="grid-item" @click.stop="select(item)">
            {{ item.name }}
          </div>
        </div>
       </div>

      <div class="item-configuration" v-if="showItemConfiguration">
        <div class="selection-header"> {{ selectedItem.name }} </div>
        <div class="share-amount" v-for="shareType in shareTypes">
          {{ shareType.name }} 
        </div>
          Gesamtbedarf:
      </div>

      <button v-if="lastSelection" class="button back-button" @click.stop="back()">
        <i class="fa fa-chevron-down" style="margin-left:8px;">zurück</i>
      </button>

      <button v-if="showItemConfiguration" class="button save-button" @click.stop="save()">
        <i class="fa fa-chevron-down" style="margin-left:8px;">speichern</i>
      </button>




    </div>
  </div>
</template>

<script>
import items from '@/data/vegetables.json'

export default {
  name: 'ConfigureDelivery',
  data() {
    return {
      items: items,
      displayedItems: items,
      lastSelection: null,
      selecteItem: {},
      showItemConfiguration: false
    }
  },
  methods: {
    select(item) {
      if (item.items)
      {
        this.lastSelection = this.displayedItems
        this.displayedItems = item.items
      }
      else
      {
        this.showItemConfiguration = true
      }
      this.selectedItem = item
    },
    back(){
      if (this.showItemConfiguration == true)
      {
        this.showItemConfiguration = false
      }
      else
      {
        this.displayedItems = this.lastSelection
        this.lastSelection = null
        this.selecteItem = {}
      }
    },
    save(){
      this.back()
    }
  },
  props: {
    shareTypes: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/assets/shared.scss';
.grid-container{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-auto-rows: 1fr;
}

.grid-container::before {
  content: '';
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.grid-container > *:first-child {
  grid-row: 1/1;
  grid-column: 1/1;
}

.grid-container > * {
  background: rgba(0,0,0,0.1);
  border: 1px white solid;
}


</style>
