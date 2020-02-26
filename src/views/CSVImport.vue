<template>
  <div class="csv-import-view-container">
    <div class="header">
      Import CSV Files
    </div>
    <div class="card">
      Hier kannst du CSV-Dateien für die einzelnen Felder importieren damit man
      nicht alles händisch eingeben muss.
    </div>
    <div class="card">
      <dropdown @change="select" :options="options"/>
        <div  v-if="selection">
        <label class="text-reader">
          <file-reader @load="dataLoaded"/>
        </label>
        <div>
          <button v-if="loaded && valid" class="button" @click="upload">
            import
          </button>
        </div>
      </div>
    </div>
    <div v-if="loaded">
      Vorschau:
      <thead>
        <tr>
          <th>Name</th>
          <th>FirstName</th>
          <th>Depot</th>
          <th>eMail</th>
          <th>shareType</th>
          <th>Username</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="(user, index) in data" :key="user.name+index">
            <td>{{ user.name }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.depot }}</td>
            <td>{{ user.eMail }}</td>
            <td>{{ user.shareType }}</td>
            <td>{{ user.username }}</td>
          </tr>
        </tbody>
    </div>
    <div class="internal-link" @click="goToDataAdminView">
      zurück
    </div>
  </div>
</template>

<script>
import { DATA_ADMIN_VIEW } from '@/router.js'
import Dropdown from '@/components/utils/Dropdown.vue'
import FileReader from '@/components/utils/FileReader.vue'
import { userCsvToJson } from '@/utils/csvImporter.js'


export default {
  name: 'CSVImport',
  components: {
    Dropdown,
    FileReader
  },
  data() {
    return {
      data: [],
      selection: null,
      loaded: false,
      options: [{uid: 'user', displayString: "Benutzer"}],
    }
  },
  methods: {
    select(selection){
      this.selectedItem = null
      this.selection = selection
    },
    dataLoaded(data){
      if (this.selection){
        if (this.selection.uid == 'user'){
          let users = userCsvToJson(data)
          console.dir(users)
          this.data=users
        }
      }

      this.loaded = true
    },
    upload() {
      this.uploading = true
      this.data.forEach( u => {
        this.$store.dispatch('addOrUpdate', {schema: this.schema, item: u} )
      }
      )
      this.uploading = false
      this.$buefy.toast.open('Daten werden hochgeladen')
    },
    goToDataAdminView() {
      console.dir("click")
      this.$router.push({name: DATA_ADMIN_VIEW}) 
    }
  },
  computed: {
    valid() {
      return true
    },
    schema() {
      if (this.selection){
        if (this.selection.uid == 'user'){
          return this.$store.getters.schemas.find(s => s.schemaName == "users")
        }
      }
      return {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/shared.scss';
</style>
