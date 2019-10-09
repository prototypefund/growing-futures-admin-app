<template>
  <div class="product-configuration-container modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>

      <div class="header">
        <div class="header-grid">
          <div class="header-grid-item">
            <div class="product-name"> {{ product.name }} </div>
          </div>
          <div class="grid-item">
            <button class="button header-button save-button" @click.stop="done">
              <i class="fa fa-check"></i>
            </button>
          </div>
          <div class="grid-item">
            Bedarf
                <button class="button header-button" @click.stop="">
              {{ total }} {{ displayUnit }}
            </button>
          </div>

          <div class="grid-item">
            Ernte
            <button class="button header-button" v-if="!inputHarvestInfo"
                                                 @click.stop="toggleHarvestInput"
              :class="{'inactive-header': !harvestUsed}">
              {{ harvested }} {{ displayUnit }}
            </button>
            <input v-else type="number" ref="fubar" @keyup.enter="toggleHarvestInput" class="button header-button"
                                                                               v-model="harvested"/>
          </div>

          <div class="grid-item">
            Puffer
            <button class="button header-button" @click.stop=""
              :disabled="!harvestUsed"
              :class="{'inactive-header': !harvestUsed, 'error-header': bufferOverflow}">
              {{ buffer }} {{ displayUnit }}
            </button>
          </div>
          <div class="grid-item">
            Teilen
            <button class="button header-button" @click.stop="splitHarvest()"
              :disabled="!harvestUsed"
              :class="{'inactive-header': !harvestUsed}">
              <i class="fa fa-share"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="shares">
        <div v-for="t in shareTypes" :key="t.type" class="share-header">
          {{ t.name }} ({{ t.shares }} Mal)
          <!-- <b-input v-model="planned[t.type]"></b-input> -->
          <scroll-picker v-model="planned[t.type]" :options="scrollOptions"/>
        </div>
        <hr class="divider"/>
       </div>

    </div>
  </div>
</template>

<script>
import ScrollPicker from './scroll-picker/ScrollPicker.js'
import range from '@/data/kilogrammRange.json'

export default {
  name: 'ProductConfiguration',
  components: {
    ScrollPicker,
  },
  data() {
    return {
      inputHarvestInfo: false,
      harvested: 0,
      planned: {},
      range: range,
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
      this.range = [...new Set(this.range)].sort()
      console.log(this.range)
    },
    splitHarvestByWeight() {
      let round = 40
      let calculate = s => {
        return Math.floor(round*s.factor*this.harvested/s.shares)/round
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
        return Math.floor(round*s.factor*this.harvested/s.shares)/round
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

      let response = {}
      let product = JSON.parse(JSON.stringify(this.product));
      response.product = product
      response.harvested = this.harvested
      response.planned = this.planned
      response.buffer = this.buffer

      this.harvested = 0; 
      this.planned = {};

      return response
    },
    focusInput() {
      this.$refs.fubar.focus();
    },
    toggleHarvestInput(e) {
      this.inputHarvestInfo = !this.inputHarvestInfo 
      console.dir(this.$refs)
      this.$nextTick(() => {
          this.$refs.fubar.select()
          this.$refs.fubar.focus()
        })
    },
    done() {
      console.dir(this.inputHarvestInfo)
      if (this.inputHarvestInfo) {
        console.dir('here')
        this.toggleHarvestInput(null)
      } else { 
        this.$emit('done', this.createResponse())
      }
    }
  },
  computed: {
    bufferOverflow: function() {
      return this.buffer < 0 && this.harvested > 0
    },
    harvestUsed: function() {
      return this.harvested > 0
    },
    total: function() {
      let amount = 0
      this.shareTypes.forEach(t => {
        let planPerShare = this.planned[t.type]
        if (planPerShare)
        {
          amount += t.shares * planPerShare
        }
      })
      return Math.round(100*amount)/100
    },
    buffer: function() {
      if (this.harvestUsed)
      {
        let amount = this.harvested - this.total
        return Math.round(100*amount)/100
      }
      return 0
    },
    relevantHarvestAmount: function() {
      if (this.harvested > 0 )
      {
        return this.harvested
      }
      return this.total
    },

    displayUnit: function() {
      switch (this.product.unit) {
        case "p":
          return " Stück"
        case "g":
          return "kg"
        default:
          return "k/A"
      }
    },
    scrollOptions: function() {
      switch (this.product.unit) {
        case "p":
          return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        case "g":
          return this.range
        default:
          return "k/A"
      }

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.header-grid{
  margin-top: 5px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 40% 40%;
  grid-row-gap: 5px;
}

.header-grid-item {
 font-size: 0.8em;
 grid-column: 1 / span 3;
}

.text-grid-item {
  text-align: left;
}

.table-container{
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
  float: left;
}

.share-header{
  font-size: 1.2em;
  font-weight: bold;
}


.header-button {
  font-weight: bold;
  float: left;
  width: 100%;
  height: 100%;
}

.text-input {
  width: 100%
}

.save-button {
  border-radius: 50%;
}

.warning{
  font-weight: bold;
  color:red;
}

.divider{
  border-top: 2px solid $primary;
}

</style>