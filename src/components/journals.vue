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
        select-all
        @click:row="handleclick"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
        <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>
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
      headers: [
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
      localStorage.component = 'journal_entries'
      localStorage.journalid = value.journalid
      this.$emit('clickedJournal', 'journal_entries')
      console.log(value)
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
