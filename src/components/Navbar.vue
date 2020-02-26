<template>
  <div class="header-bar-container">
    <Slide>
      <router-link to="/" tag="div" class="nav-item">
        Dashboard
      </router-link>
      <router-link to="/delivery/management" tag="div" class="nav-item">
        Lieferungen
      </router-link>
      <router-link to="/inventory" tag="div" class="nav-item">
        Inventar
      </router-link>
      <router-link to="/feedback/summary" tag="div" class="nav-item">
        Feedback
      </router-link>
      <router-link to="/data-admin" tag="div" class="nav-item">
        Datenpflege
      </router-link>
      <div>Version: 0.2.7</div>
    </Slide>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu' 

export default {
  name: 'Navbar',
  components: {
    Slide
  },
  data() {
    return {
      key: "value"
    }
  },
  methods: {
    name() {

    }
  },
}
</script>

<style lang="scss">
.header-bar-container {
  height: 100px;
}
.nav-item {
  line-height: 30px;
  cursor: pointer;
  text-align: left;
}
.icon {
  max-width: 30px;
  max-height: 30px;
  margin-right: 10px;
}
</style>
