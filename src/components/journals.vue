<template>
  <v-main>
    <v-alert>Your Journals</v-alert>

    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="values"
        :search="search"
        item-key="name"
        class="elevation-1"
    >

      <!-- open journal entries -->
      <template v-slot:[`item.enter`]="{ item }">
        <v-dialog
            v-model="dialogUpdate"
            persistent
            max-width="600px"
            :retain-focus="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                depressed
                small
                class="mr-2"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                @click="handleclick(item.journalid)"
            >Open</v-btn>
          </template>
        </v-dialog>
      </template>

      <!-- update -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-dialog
            v-model="dialogUpdate"
            persistent
            max-width="600px"
            :retain-focus="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                small
                class="mr-2"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                @click="item"
            >mdi-pencil</v-icon>
          </template>
          <vcard>

          </vcard>
        </v-dialog>

        <!-- delete -->
        <v-dialog
            v-model="dialogUpdate"
            persistent
            max-width="600px"
            :retain-focus="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                small
                class="mr-2"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >mdi-delete</v-icon>
          </template>
          <v-card>

          </v-card>
        </v-dialog>


        <!-- update -->
        <v-dialog
            v-model="dialogUpdate"
            persistent
            max-width="600px"
            :retain-focus="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                small
                class="mr-2"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >mdi-plus</v-icon>
          </template>
          <v-card>

          </v-card>
        </v-dialog>

      </template>
    </v-data-table>

    <!-- create journal -->
    <v-card>
      <v-card-title class="ml-n3">Create Journal</v-card-title>
      <v-form class="ma-2, pa-2">
        <v-text-field v-model="title" label="Title"></v-text-field>
        <v-textarea v-model="description" label="Description"></v-textarea>
        <v-btn @click="createJournal">Create</v-btn>
      </v-form>
    </v-card>
    <v-data-table
    ></v-data-table>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
name: "journals",
  data() {
    return {
      search: "",
      selected: false,
      singleselect: false,
      title: "",
      description: "",
      userid: localStorage.userid,
      token: localStorage.token,
      journalid: '',
      headers: [
        {text: '', value: 'enter'},
        {text: 'Journal ID', value: 'journalid'},
        {text: 'Title', value: 'title'},
        {text: 'Description', value: 'description'},
        {text: 'User ID', value: 'userid'},
        {
          text: 'Actions',
          align: 'start',
          sortable: false,
          value: 'actions',
        }
      ],
      values: []
    }
  },
  async mounted() {
    await this.GetJournals()
  },
  methods: {
    handleclick(value) {
      localStorage.journalid = value
      console.log(value)
      this.$router.push('./journal_entries')
    },
    async createJournal() {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` }
      }
      //console.log(config)
      let body = {
        title: this.title,
        description: this.description,
        userid: localStorage.userid
      }
      try {
        //console.log(body)
        const res = await axios.post('http://192.168.50.63:8000/journal', body, config)
        console.log(res)
        alert('Journal Successfully Submitted!')
      } catch (e) {
        console.log(e)
      }
    },
    async GetJournals() {
      let journals
      try {
        const res = await axios.get('http://192.168.50.63:8000/journal')
        res.data
        journals = res.data
        console.log(journals)

        for (let journal in journals) {
          console.log(journals[journal].userid)
          if(localStorage.userid == journals[journal].userid) {
            let body = {
              journalid: journals[journal].journalid,
              title: journals[journal].title,
              description: journals[journal].description,
              userid: journals[journal].userid,
            }
            this.values.push(body)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
