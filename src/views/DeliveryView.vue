<template>
  <div class="delivery-view-container">
    <div class="view-header-background">
      <div class="view-title">Lieferung</div>
        <div class="next-delivery">
          Lieferung für {{ days[nextDelivery.getDay()] }} den {{ nextDelivery.toLocaleDateString("de-DE") }}
        </div>
        <div class="share-type" v-for="shareType in shareTypes" :key="shareType.type">
        <div class="share-header"> {{ shareType.name }} </div>
          <share-calculation :shareType=shareType :shareTypes=shareTypes />
        </div>
      </div>
  </div>
</template>

<script>
import ShareCalculation from '@/components/ShareCalculation.vue'
export default {
  name: 'Delivery',
  components: {
    ShareCalculation,
  },
  data() {
    return {
      days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      shareTypes: [{
                    type: "small",
                    name: "Kleiner Anteil"
                    },
                    {
                    type: "big",
                    name: "Großer Anteil"
                    }],
      nextDelivery: new Date("2019-10-04"),
      upcomingDeliveries: [new Date("2019-10-04"), new Date("2019-10-11"), new Date("2019-10-18"), new Date("2019-10-25")],
      previousDeliveries: [new Date("2019-09-27"), new Date("2019-09-20"), new Date("2019-09-13"), new Date("2019-10-06")]
    }
  },
  methods: {
    name() {

    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';

.content {
  margin-top: 100px;
  display: inline-block;
  padding: 30px 40px;

  font-size: 18px;
}

.label {
  margin-bottom: 10px;
}

.next-delivery{
font-size: 30px;
font-weight: bold;
padding: 20px;
}

.share-header{
font-size: 20px;
font-weight: bold;
padding: 20px;
}
</style>
