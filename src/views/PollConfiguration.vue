<template>
<div class="poll-configuration-view-container">
  <div class="header">
    Poll Configuration
  </div>
  <div class="config-area" v-if="updatedPoll">
     Daten sammeln: <b-switch v-model="updatedPoll.collectData"/>

    <div class="content card">
      <category-amount v-for="c in this.updatedPoll.products" :key="c.uid"
        :category="c" @useForPoll="useForPoll"/>
    </div>

    <div>
      <div class="button" @click="resetPoll">
        reset
      </div>
      <div class="button" @click="savePoll">
        save
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="link" @click="goToFeedbackSummary">
      back
    </div>
  </div>
</div>
</template>

<script>
import CategoryAmount from '@/components/utils/CategoryAmount.vue'
import { FEEDBACK_SUMMARY } from '@/router.js'
import { display } from '@/mixins/display.js'
import { resolver } from '@/mixins/resolver.js'

export default {
  name: 'PollConfigurationView',
  mixins: [display, resolver],
  components: {
    CategoryAmount,
  },
  async mounted() {
     let polls = await this.$store.getters.polls
     if (polls.length > 0)
       this.updatedPoll = polls[0]
     else
        this.updatedPoll = { uid: "defaultPoll" }
    },
  data() {
    return {
      updatedPoll: null,
    }
  },
  methods: {
    goToFeedbackSummary(){
      this.$router.push({name: FEEDBACK_SUMMARY}) 
    },
    useForPoll(data){
      console.dir(data)
    },
    savePoll() {
      console.dir("saving")
      let newPoll = this.$jsonCopy(this.updatedPoll)
      this.$store.dispatch('addOrUpdate', {schema: this.schema, item: newPoll} )
    },
    resetPoll() {
      let products = this.$jsonCopy(this.$store.getters.products)
      this.updatedPoll = products.reduce((r,i) => {
        let category = i.categories[0]
        if (! r.products[category]) {
          r.products[category] = {}
          r.products[category].category = this.resolveCategoryId(category)
          r.products[category].content = []
        }
        r.products[category].content.push(i)
        return r
      },
      { uid: this.updatedPoll.uid,
        products: {}})
    }
  },
  computed: {
    schema() {
      return this.$store.getters.schemas.find(s => s.schemaName == "poll")
    },
  }
}

</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
.footer{
  margin-top: 20px;
}
.card{
  padding: 80px;
}
</style>
