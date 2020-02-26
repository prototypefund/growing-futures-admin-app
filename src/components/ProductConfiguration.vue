<template>
  <div class="product-configuration-container">
    <div class="modal-content">

      <div class="header">
          <div class="product-name"> {{ resolveProductIdToName(product.uid) }} </div>

          <div class="actions">
            <div class="action-item">
              <button class="button control-button gray-header-button" @click.stop="toggleUnit">
                {{ product.unit | displayUnit }}
              </button>
            </div>
            <div class="action-item">
              <button class="button header-button control-button
                gray-header-button" @click.stop="$emit('close')">
                <i class="fa fa-times"></i>
              </button>
            </div>
            <div class="action-item">
              <button class="button header-button control-button save-button" @click.stop="done">
                <i class="fa fa-check"></i>
              </button>
            </div>
          </div>

          <div class="configuration">
            <div class="config-item">
              <div class="config-label">
                Bedarf
              </div>
              <div class="config-action">
                <button class="button header-button" @click.stop="">
                  {{ total }} {{ product.unit | displayUnit }}
                </button>
              </div>
            </div>
            <div class="config-item">
              <div class="config-label">
                Buffer
              </div>
              <div class="config-action">
                <button class="button header-button" v-if="!inputHarvestInfo"
                                                  @click.stop="toggleHarvestInput">
                  {{ buffer }} {{ product.unit | displayUnit }}
                </button>
                <input v-else type="number"
                              ref="harvestinput"
                              @keyup.enter="inputHarvestInfo = !inputHarvestInfo" 
                              @blur="inputHarvestInfo = false"
                              class="input"
                              v-model.number="buffer"/>
              </div>
            </div>
            <div class="config-item">
              <div class="config-label">
                Inventory
              </div>
              <div class="config-action">
                <button class="button header-button" @click.stop=""
                  :class="{'inactive-header': !bufferUsed, 'error-header': bufferOverflow}">
                  {{ inventoryAmount }} {{ product.unit | displayUnit }}
                </button>
              </div>
            </div>
            <div class="config-item">
              <div class="config-label">
                Teilen
              </div>
              <div class="config-action">
                <button class="button header-button" @click.stop="splitHarvest()"
                  :class="{'inactive-header': true}">
                  <i class="fa fa-share-alt" style="transform: rotate(90deg)"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      
      <div class="shares">
        <div v-for="t in shareTypes" :key="t.type" class="share-header">
          {{ t.name }} ({{ t.shares }} Mal)
          <!-- <b-input v-model="planned[t.type]"></b-input> -->
          <div class="scroll-container">
            <scroll-picker v-model="planned[t.type]" :options="scrollOptions"/>
          </div>
        </div>

        <div>
          <hr class="divider"/>
        </div>

      </div>
      <div class="delete-button-container">
        <button class="button control-button delete-button is-danger is-large" @click.stop="remove">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollPicker from './scroll-picker/ScrollPicker.js'
import range from '@/data/kilogrammRange.json'
import { display } from '@/mixins/display.js'
import { resolver } from '@/mixins/resolver.js'

export default {
  name: 'ProductConfiguration',
  mixins: [display, resolver],
  components: {
    ScrollPicker,
  },
  mounted() {
    if (this.product.buffer){
      this.buffer = this.product.buffer
    }
  },
  data() {
    return {
      inputHarvestInfo: false,
      planned: this.product.planned,
      range: range,
      buffer: 0,
    }
  },
  props: {
    shareTypes: Array,
    product: Object
  },
  methods: {
    splitHarvest() {
      if (this.product.unit == 'g') {
       this.splitHarvestByWeight() 
      } else if (this.product.unit == 'p') {
       this.splitHarvestByPieces() 
      }

      this.shareTypes.forEach(share => this.range.push(this.planned[share.type]))
      this.range = Array.from(new Set(this.range)).sort()
    },
    splitHarvestByWeight() {
      let round = 40
      let calculate = s => {
        return Math.floor(round*s.factor*this.inventoryAmount/s.shares)/round
      }
      this.getShareAmount().forEach(share => 
        {
          this.$set(this.planned,
                    share.type,
                    calculate(share))
        })
    },
    splitHarvestByPieces() {
      let round = 1
      let calculate = s => {
        return Math.floor(round*s.factor*this.inventoryAmount/s.shares)/round
      }
      this.getShareAmount().forEach(share => 
        {
          this.$set(this.planned,
                    share.type,
                    calculate(share))
        })
    },
    getShareAmount() {
      let shareTotal = this.shareTypes.reduce((a, b) => a + b.factor, 0)
      let buildShareTotal =  (share, shareTotal) => {
        return {'type': share.type,
                'factor': share.factor/shareTotal,
                'shares': share.shares}
      }
      return this.shareTypes.map(share => buildShareTotal(share, shareTotal))
    },
    createResponse(){
      let response = JSON.parse(JSON.stringify(this.product));
      this.planned.total = this.total
      response.planned = this.planned
      response.buffer = this.buffer

      this.planned = {};

      return response
    },
    focusInput() {
      this.$refs.harvestinput.focus();
    },
    toggleHarvestInput() {
      this.inputHarvestInfo = !this.inputHarvestInfo 
      this.$nextTick(() => {
          this.$refs.harvestinput.select()
          this.$refs.harvestinput.focus()
        })
    },
    done() {
      if (this.inputHarvestInfo) {
        this.inputHarvestInfo = !this.inputHarvestInfo 
      } else { 
        this.$emit('done', this.createResponse())
      }
    },
    toggleUnit(){
      if (this.product.unit == 'p') {
        this.product.unit = 'w'
      } else if (this.product.unit == 'w') {
        this.product.unit = 'b'
      } else if (this.product.unit == 'b') {
        this.product.unit = 'p'
      } else{
        this.product.unit = 'p'
      }

      this.planned = {}
    },
    remove() {
      this.$emit('remove', this.product.uid)
    }
  },
  computed: {
    inventory() {
      return this.$store.getters.inventory
    },
    inventoryAmount() {
      let item = this.inventory.segments.find(i => i.key == this.product.uid)
      if (item){
        let amount = item.pivot.value.find(v => this.product.unit == v.unit)
        if (amount) {
          return amount.value
        }
      }
      return 0
      return item
    },
    bufferOverflow: function() {
      return this.buffer + this.total > this.inventoryAmount
    },
    bufferUsed: function() {
      return this.buffer > 0
    },
    total: function() {
      let amount = 0
      this.shareTypes.forEach(t => {
        if (!this.planned)
        {
          this.planned = {}
        }
        let planPerShare = this.planned[t.type]
        if (planPerShare)
        {
          amount += t.shares * planPerShare
        }
      })
      return Math.round(100*amount)/100 + this.buffer
    },
    scrollOptions: function() {
      switch (this.product.unit) {
        case "p":
        case "b":
          return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        case "w":
          return this.range
        default:
          return [0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.actions {
  display: flex;

  .action-item {
    flex: 1;
    padding: 5px;

    .button {
      width: 100%;
    }
  }
}

.configuration {
  margin: 20px 0px;
  display: flex;
  flex-wrap: wrap;
  
  .config-item {
    flex: 1; 
  }
}


.harvest-info-container{
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  height: 4em;
}

.inactive-header {
  background: LightGrey;
  color: DimGray;
}

.error-header {
  background: red;
  color: white;
}


.harvest-input{
  width: 15%;
  float: left;
}

.unit-input{
  width: 25%;
  float: left;
}

.calculate-share{
  width: 25%;
}

.product-name{
  font-weight: bold;
  font-size: 2em;
  text-align: left;
  padding-left: 0.3em;
}

.share-header{
  font-size: 1.2em;
  font-weight: bold;
}


.header-button {
  font-weight: bold;
}

.gray-header-button {
  font-weight: bold;
  background-color: LightGrey;
  color: black;

  &:hover {
    background-color: lighten(LightGrey, 5%);
  }
}

.text-input {
  width: 100%
}

.warning{
  font-weight: bold;
  color:red;
}

.scroll-container{
  width: 50%;
  margin: 0 auto;
  padding: 20px;
}

.divider{
  border-top: 2px solid $primary;
}

.delete-button-container {
  padding-bottom: 30px;
}

</style>
