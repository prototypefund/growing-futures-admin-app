<template>
  <div class="product-configuration-container modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>

      <div class="header">
        <div class="header-grid">
          <div class="header-grid-item">
            <div class="product-name"> {{ product.name }} </div>
          </div>

          <div class="grid-item">
            <button class="button gray-header-button" @click.stop="toggleUnit">
              {{ product.unit | displayUnit }}
            </button>
          </div>
 
          <div class="grid-item">
            <button class="button header-button save-button" @click.stop="done">
              <i class="fa fa-check"></i>
            </button>
          </div>
          <div class="grid-item">
            Bedarf
                <button class="button header-button" @click.stop="">
              {{ total }} {{ product.unit | displayUnit }}
            </button>
          </div>

          <div class="grid-item">
            Ernte
            <button class="button header-button" v-if="!inputHarvestInfo"
                                                 @click.stop="toggleHarvestInput"
              :class="{'inactive-header': !harvestUsed}">
              {{ harvested }} {{ product.unit | displayUnit }}
            </button>
            <input v-else type="number"
                          ref="harvestinput"
                          @keyup.enter="inputHarvestInfo = !inputHarvestInfo" 
                          class="button header-button"
                          v-model="harvested"/>
          </div>

          <div class="grid-item">
            Puffer
            <button class="button header-button" @click.stop=""
              :disabled="!harvestUsed"
              :class="{'inactive-header': !harvestUsed, 'error-header': bufferOverflow}">
              {{ buffer }} {{ product.unit | displayUnit }}
            </button>
          </div>
          <div class="grid-item">
            Teilen
            <button class="button header-button" @click.stop="splitHarvest()"
              :disabled="!harvestUsed"
              :class="{'inactive-header': !harvestUsed}">
              <i class="fa fa-share-alt" style="transform: rotate(90deg)"></i>
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
import { display } from '@/mixins/display.js'

export default {
  name: 'ProductConfiguration',
  mixins: [display],
  components: {
    ScrollPicker,
  },
  data() {
    return {
      inputHarvestInfo: false,
      harvested: this.product.harvested,
      planned: this.product.planned,
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
      this.range = Array.from(new Set(this.range)).sort()
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
      let response = JSON.parse(JSON.stringify(this.product));
      this.planned.total = this.total
      response.harvested = this.harvested
      response.planned = this.planned
      response.buffer = this.buffer

      this.harvested = 0; 
      this.planned = {};

      return response
    },
    focusInput() {
      this.$refs.harvestinput.focus();
    },
    toggleHarvestInput(e) {
      this.inputHarvestInfo = !this.inputHarvestInfo 
      console.dir(this.$refs)
      this.$nextTick(() => {
          this.$refs.harvestinput.select()
          this.$refs.harvestinput.focus()
        })
    },
    done() {
      console.dir(this.inputHarvestInfo)
      if (this.inputHarvestInfo) {
        this.inputHarvestInfo = !this.inputHarvestInfo 
      } else { 
        this.$emit('done', this.createResponse())
      }
    },
    toggleUnit(){
      if (this.product.unit == 'p') {
        this.product.unit = 'g'
      } else if (this.product.unit == 'g')
      {
        this.product.unit = 'p'
      }
      this.planned = {}
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
 grid-column: 1 / span 2;
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

.gray-header-button {
  font-weight: bold;
  float: left;
  width: 80%;
  height: 80%;
  line-height: 80%;
  background-color: LightGrey;
  color: black;

  &:hover {
    background-color: lighten(LightGrey, 5%);
  }

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
