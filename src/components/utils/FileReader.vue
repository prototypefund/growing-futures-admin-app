<template>
  <div class="csv-import-view-container">
    <b-loading :is-full-page="false" :active.sync="loading"
       :can-cancel="true"></b-loading>
    <label class="text-reader">
      Read File
      <input type="file" @change="loadTextFromFile">
    </label>
  </div>
</template>
<script>

export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    loadTextFromFile(fileHandle) {
      this.loading = true 
      let file = fileHandle.target.files[0]
      let reader = new FileReader();

      reader.onload = e => this.$emit("load", e.target.result)
      reader.readAsText(file)
      this.loading = false
    }
  }
};
</script>

<style>
</style>
